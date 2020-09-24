import type { ClientOptions } from 'discord.js';
import type { ClientOptions as InfluxDBClientOptions } from '@influxdata/influxdb-client';

export const DEV = 'DEV' in process.env ? process.env.DEV === 'true' : !('PM2_HOME' in process.env);
export const ENABLE_INFLUX = 'ENABLE_INFLUX' in process.env ? process.env.ENABLE_INFLUX === 'true' : !DEV;

export const PREFIX = '-';
export const OWNER_ID = '';

export const PGSQL_DATABASE_NAME = '';
export const PGSQL_DATABASE_PASSWORD = '';
export const PGSQL_DATABASE_USER = '';
export const PGSQL_DATABASE_PORT = 5432;
export const PGSQL_DATABASE_HOST = 'localhost';

export const INFLUX_URL = 'http://localhost:8285';
export const INFLUX_TOKEN = '';
export const INFLUX_ORG = 'Dasby-Project';
export const INFLUX_ORG_ANALYTICS_BUCKET = 'analytics';
export const INFLUX_OPTIONS: InfluxDBClientOptions = {
	url: INFLUX_URL,
	token: INFLUX_TOKEN
};

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

export const TOKENS = {
	BOT_TOKEN: ''
};
