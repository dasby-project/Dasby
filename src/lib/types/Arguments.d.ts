import type { DasbyCommand } from '@lib/structures/Command';
import type { BaseAliasStore } from '@sapphire/framework';
import type { Emoji, Client } from 'discord.js';

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
