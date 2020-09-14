import type { ClientOptions } from 'discord.js';
export const DEV = 'DEV' in process.env ? process.env.DEV === 'true' : !('PM2_HOME' in process.env);

export const PREFIX = '-';
export const OWNER_ID = '497061687820812288';

export const PGSQL_DATABASE_NAME = 'dasby';
export const PGSQL_DATABASE_PASSWORD = '';
export const PGSQL_DATABASE_USER = 'postgres';
export const PGSQL_DATABASE_PORT = 5432;
export const PGSQL_DATABASE_HOST = 'localhost';

export const CLIENT_OPTIONS: ClientOptions = {
	i18n: {
		i18next: {
			preload: ['es-ES'],
			load: 'all',
			fallbackLng: 'es-ES',
			initImmediate: false
		}
	}
};

export const SECRETS = {
	BOT_TOKEN: ''
};
