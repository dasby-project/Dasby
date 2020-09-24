import type { PieceContext } from '@sapphire/pieces';
import type { NewsChannel } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<NewsChannel> {
	public constructor(context: PieceContext) {
		super(context, { name: 'newsChannel' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<NewsChannel> {
		const channel = (context.message.guild ? context.message.guild.channels : this.client.channels).cache.get(argument);

		if (!channel) {
			return this.error(
				argument,
				'ArgumentChannelMissingChannel',
				await context.message.fetchLanguageKey('arguments/core:newsChannel.missingChannel')
			);
		}
		if (channel.type !== 'news') {
			return this.error(
				argument,
				'ArgumentNewsChannelInvalidChannel',
				await context.message.fetchLanguageKey('arguments/core:newsChannel.invalidChannel')
			);
		}

		return this.ok(channel as NewsChannel);
	}
}
