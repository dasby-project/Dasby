import { Intents, ClientOptions } from 'discord.js';

export const DEV = Reflect.has(process.env, 'DEV') ? process.env.DEV === 'true' : !('PM2_HOME' in process.env);
export const ENABLE_LAVALINK = Reflect.has(process.env, 'ENABLE_LAVALINK') ? process.env.ENABLE_LAVALINK === 'true' : !DEV;
export const PREFIX = '-';
export const OWNER_ID = '';

export const PGSQL_DATABASE_NAME = '';
export const PGSQL_DATABASE_PASSWORD = '';
export const PGSQL_DATABASE_USER = '';
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
	},
	ws: {
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MEMBERS,
			Intents.FLAGS.GUILD_BANS,
			Intents.FLAGS.GUILD_EMOJIS,
			Intents.FLAGS.GUILD_VOICE_STATES,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			Intents.FLAGS.DIRECT_MESSAGES,
			Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
		]
	}
};

export const TOKENS = {
	BOT_TOKEN: ''
};
