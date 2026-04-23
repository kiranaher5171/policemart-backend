import type { Core } from '@strapi/strapi';

/**
 * When using S3 (or a CDN in front of it), set AWS_S3_CSP_MEDIA_HOST to hostnames the admin
 * Media Library may load (comma-separated), e.g. mybucket.s3.eu-west-1.amazonaws.com,cdn.example.com
 */
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  const extraMediaHosts = env('AWS_S3_CSP_MEDIA_HOST', '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const security: Core.Config.Middlewares[number] =
    extraMediaHosts.length > 0
      ? {
          name: 'strapi::security',
          config: {
            contentSecurityPolicy: {
              useDefaults: true,
              directives: {
                'connect-src': ["'self'", 'https:'],
                'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', ...extraMediaHosts],
                'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', ...extraMediaHosts],
                upgradeInsecureRequests: null,
              },
            },
          },
        }
      : 'strapi::security';

  return [
    'strapi::logger',
    'strapi::errors',
    security,
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    {
      name: 'strapi::body',
      config: {
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
};

export default config;
