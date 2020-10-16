import type { Emoji } from 'discord.js';

declare module '@sapphire/framework' {
	interface ArgType {
		boolean: boolean;
		emoji: Emoji;
	}
	interface Command {
		fullCategory: Array<string>;
		category: string;
		subCategory: string;
	}
}
