import type { Core } from '@strapi/strapi';

/**
 * Local uploads (default) are lost on Render redeploys → 404 for /uploads/*.
 * Set AWS_S3_UPLOAD_ENABLED=true and the AWS_* vars (or S3-compatible endpoint) on Render
 * so the Media Library persists to object storage.
 */
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const enabled = env.bool('AWS_S3_UPLOAD_ENABLED', false);
  const accessKeyId = env('AWS_ACCESS_KEY_ID', '');
  const secretAccessKey = env('AWS_SECRET_ACCESS_KEY', env('AWS_ACCESS_SECRET', ''));
  const bucket = env('AWS_BUCKET', '');
  const region = env('AWS_REGION', '');

  if (!enabled || !accessKeyId || !secretAccessKey || !bucket || !region) {
    return {};
  }

  const endpoint = env('AWS_S3_ENDPOINT', '');
  const forcePathStyle = env.bool('AWS_S3_FORCE_PATH_STYLE', false);
  const baseUrl = env('AWS_S3_PUBLIC_URL', '');
  const rootPath = env('AWS_S3_ROOT_PATH', '');
  const disableAcl = env.bool('AWS_S3_DISABLE_ACL', false);

  const params: Record<string, unknown> = { Bucket: bucket };
  if (!disableAcl) {
    params.ACL = env('AWS_S3_ACL', 'public-read');
    params.signedUrlExpires = env.int('AWS_SIGNED_URL_EXPIRES', 15 * 60);
  }

  return {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          ...(baseUrl ? { baseUrl } : {}),
          ...(rootPath ? { rootPath } : {}),
          s3Options: {
            credentials: { accessKeyId, secretAccessKey },
            region,
            ...(endpoint ? { endpoint } : {}),
            ...(forcePathStyle ? { forcePathStyle: true } : {}),
            params,
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};

export default config;
