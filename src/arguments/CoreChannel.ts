import type { PieceContext } from '@sapphire/pieces';
import type { Channel } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<Channel> {
	public constructor(context: PieceContext) {
		super(context, { name: 'channel' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<Channel> {
		const channel = (context.message.guild ? context.message.guild.channels : this.client.channels).cache.get(argument);

		if (!channel) {
			return this.error(
				argument,
				'ArgumentChannelMissingChannel',
				await context.message.fetchLanguageKey('arguments/core:channel.missingChannel')
			);
		}

		return this.ok(channel);
	}
}
