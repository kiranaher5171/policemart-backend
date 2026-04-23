"use strict";
/**
 * contact-message controller — wraps create() so Strapi logs the real error (fixes silent 500).
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::contact-message.contact-message', ({ strapi }) => ({
    async create(ctx) {
        try {
            const base = Object.getPrototypeOf(this);
            return await base.create.call(this, ctx);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            strapi.log.error(`[contact-message.create] ${message}`);
            if (err instanceof Error && err.stack) {
                strapi.log.error(err.stack);
            }
            throw err;
        }
    },
}));
