import type { Core } from '@strapi/strapi';

/**
 * Use default strapi::security (CSP includes 'self' for admin bundles + dev admin/HMR rules).
 * Overriding only script-src (e.g. to 'unsafe-eval' alone) breaks production /admin/*.js on Render.
 */
const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
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
