import { Intents, ClientOptions } from 'discord.js';
export const DEV = false;
export const NAME = 'Dasby';
export const VERSION = '1.0.0';
export const PREFIX = '-';
export const LAVALINK = false;
export const OWNERS = [''];

export const PGSQL = {
	NAME: '',
	USER: '',
	PASSWORD: '',
	PORT: 5432,
	HOST: 'localhost'
};

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
		intents: Intents.ALL
	}
};

export const TOKENS = {
	BOT_TOKEN: ''
};
