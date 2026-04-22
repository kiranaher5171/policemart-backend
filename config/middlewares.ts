import type { Core } from '@strapi/strapi';

/**
 * Strapi Admin in dev uses Vite; HMR uses eval(), so CSP needs script-src 'unsafe-eval'.
 * Use the object form of strapi::security (avoids TS mismatch: extendMiddlewareConfiguration
 * types do not accept Core.Config.Middlewares because MiddlewareHandler is allowed there).
 */
const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'script-src': ["'unsafe-eval'"],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      // Defaults are small for form/text; admin Media Library POSTs multipart + fields
      formLimit: '256mb',
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 250 * 1024 * 1024,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
