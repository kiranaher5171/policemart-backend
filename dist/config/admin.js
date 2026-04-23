"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = ({ env }) => ({
    // Avoids upload pipeline calling Strapi AI metadata (can 500 if AI/token misconfigured on CE).
    ai: {
        enabled: env.bool('ADMIN_AI_ENABLED', false),
    },
    auth: {
        secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT'),
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT'),
        },
    },
    secrets: {
        encryptionKey: env('ENCRYPTION_KEY'),
    },
    flags: {
        nps: env.bool('FLAG_NPS', true),
        promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
});
exports.default = config;
