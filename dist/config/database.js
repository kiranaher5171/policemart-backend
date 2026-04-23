const path = require('path');
module.exports = ({ env }) => {
    const client = env('DATABASE_CLIENT', 'sqlite');
    if (client === 'sqlite') {
        return {
            connection: {
                client: 'sqlite',
                connection: {
                    filename: path.join(process.cwd(), env('DATABASE_FILENAME', '.tmp/data.db')),
                },
                useNullAsDefault: true,
            },
        };
    }
    return {
        connection: {
            client: 'mysql',
            connection: {
                host: env('DATABASE_HOST', '127.0.0.1'),
                port: env.int('DATABASE_PORT', 3306),
                database: env('DATABASE_NAME', 'strapi'),
                user: env('DATABASE_USERNAME', 'root'),
                password: env('DATABASE_PASSWORD', ''),
                ssl: env.bool('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false,
            },
            pool: {
                min: env.int('DATABASE_POOL_MIN', 2),
                max: env.int('DATABASE_POOL_MAX', 10),
            },
            acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
        },
    };
};
