import type { User } from 'discord.js';

declare module '@sapphire/framework' {
	interface ArgType {
		user: User;
	}
}
