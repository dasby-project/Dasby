import type { PieceContext } from '@sapphire/pieces';
import type { TextChannel } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<TextChannel> {
	public constructor(context: PieceContext) {
		super(context, { name: 'textChannel' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<TextChannel> {
		const channel = (context.message.guild ? context.message.guild.channels : this.client.channels).cache.get(argument);

		if (!channel) {
			return this.error(
				argument,
				'ArgumentChannelMissingChannel',
				await context.message.fetchLanguageKey('arguments/core:textChannel.missingVhannel')
			);
		}
		if (channel.type !== 'text') {
			return this.error(
				argument,
				'ArgumentTextChannelInvalidChannel',
				await context.message.fetchLanguageKey('arguments/core:textChannel.invalidChannel')
			);
		}

		return this.ok(channel as TextChannel);
	}
}
