import type { PieceContext } from '@sapphire/pieces';
import type { VoiceChannel } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<VoiceChannel> {
	public constructor(context: PieceContext) {
		super(context, { name: 'voiceChannel' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<VoiceChannel> {
		const channel = (context.message.guild ? context.message.guild.channels : this.client.channels).cache.get(argument);

		if (!channel) {
			return this.error(
				argument,
				'ArgumentChannelMissingChannel',
				await context.message.fetchLanguageKey('arguments/core:voiceChannel.missingChannel')
			);
		}
		if (channel.type !== 'voice') {
			return this.error(
				argument,
				'ArgumentVoiceChannelInvalidChannel',
				await context.message.fetchLanguageKey('arguments/core:voiceChannel.invalidChannel')
			);
		}

		return this.ok(channel as VoiceChannel);
	}
}
