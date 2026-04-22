/**
 * contact-message controller — wraps create() so Strapi logs the real error (fixes silent 500).
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact-message.contact-message', ({ strapi }) => ({
  async create(ctx) {
    try {
      const base = Object.getPrototypeOf(this) as { create: (c: typeof ctx) => Promise<unknown> };
      return await base.create.call(this, ctx);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      strapi.log.error(`[contact-message.create] ${message}`);
      if (err instanceof Error && err.stack) {
        strapi.log.error(err.stack);
      }
      throw err;
    }
  },
}));
