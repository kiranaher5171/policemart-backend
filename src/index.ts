import type { Core } from '@strapi/strapi';

/** Lets the website contact form POST without a Strapi API token (local/dev). */
const CONTACT_CREATE_ACTION = 'api::contact-message.contact-message.create';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole?.id) {
      strapi.log.warn('[contact-form] Public role not found; skip contact-message permission.');
      return;
    }

    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action: CONTACT_CREATE_ACTION, role: publicRole.id },
    });

    if (existing) {
      return;
    }

    try {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action: CONTACT_CREATE_ACTION,
          role: publicRole.id,
        },
      });
      strapi.log.info(`[contact-form] Public role may now create contact messages (${CONTACT_CREATE_ACTION}).`);
    } catch (e) {
      strapi.log.warn(
        `[contact-form] Could not add public create permission (restart Strapi after adding the API). ${e}`,
      );
    }
  },
};
