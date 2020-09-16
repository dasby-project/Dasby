import type { User, Emoji } from 'discord.js';

declare module '@sapphire/framework' {
	interface CommandOptions {
		category?: string;
	}
	interface ArgType {
		user: User;
		boolean: boolean;
		emoji: Emoji;
	}
}
