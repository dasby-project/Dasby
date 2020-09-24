import type { PieceContext } from '@sapphire/pieces';
import { Constants, DiscordAPIError, GuildMember } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<GuildMember> {
	public constructor(context: PieceContext) {
		super(context, { name: 'member' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<GuildMember> {
		const { guild } = context.message;
		if (!guild) {
			return this.error(argument, 'ArgumentMemberMissingGuild', await context.message.fetchLanguageKey('arguments/core:member.missingGuild'));
		}

		try {
			return this.ok(await guild.members.fetch(argument));
		} catch (error) {
			if (error instanceof DiscordAPIError && error.code === Constants.APIErrors.UNKNOWN_MEMBER) {
				return this.error(
					argument,
					'ArgumentMemberUnknownMember',
					await context.message.fetchLanguageKey('arguments/core:member.unknownMember')
				);
			}

			return this.error(argument, 'ArgumentMemberUnknownError', await context.message.fetchLanguageKey('arguments/core:member.unknownError'));
		}
	}
}
