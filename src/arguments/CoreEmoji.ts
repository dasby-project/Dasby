import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { regex } from '@utils/constants';
import type { GuildEmoji } from 'discord.js';

export class DasbyArgument extends Argument<GuildEmoji> {
	public emojiRegex = regex.emoji;

	public constructor(context: PieceContext) {
		super(context, { name: 'emoji' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<GuildEmoji> {
		if (!argument) {
			return this.error(argument, 'EmojiArgument', await context.message.fetchLanguageKey('arguments/core:emoji.notProvided'));
		}

		const emojiID = this.emojiRegex.exec(argument);
		const emoji = emojiID ? this.client.emojis.cache.get(emojiID![1]) : null;

		if (!emoji) return this.error(argument, 'EmojiArgument', await context.message.fetchLanguageKey('arguments/core:emoji.notFound'));
		return this.ok(emoji);
	}
}
