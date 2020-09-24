import type { PieceContext } from '@sapphire/pieces';
import type { DMChannel } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<DMChannel> {
	public constructor(context: PieceContext) {
		super(context, { name: 'dmChannel' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<DMChannel> {
		const channel = this.client.channels.cache.get(argument);

		if (!channel) {
			return this.error(
				argument,
				'ArgumentChannelMissingChannel',
				await context.message.fetchLanguageKey('arguments/core:dmChannel.missingChannel')
			);
		}
		if (channel.type !== 'dm') {
			return this.error(
				argument,
				'ArgumentDMChannelInvalidChannel',
				await context.message.fetchLanguageKey('arguments/core:dmChannel.invalidChannel')
			);
		}

		return this.ok(channel as DMChannel);
	}
}
