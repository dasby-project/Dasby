import type { PieceContext } from '@sapphire/pieces';
import { Constants, DiscordAPIError, User } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class DasbyArgument extends Argument<User> {
	public constructor(context: PieceContext) {
		super(context, { name: 'user' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<User> {
		try {
			return this.ok(await this.client.users.fetch(argument));
		} catch (error) {
			if (error instanceof DiscordAPIError && error.code === Constants.APIErrors.UNKNOWN_USER) {
				return this.error(argument, 'ArgumentUserUnknownUser', await context.message.fetchLanguageKey('arguments/core:user.unknownUser'));
			}

			return this.error(argument, 'ArgumentUserUnknownError', await context.message.fetchLanguageKey('arguments/core:user.unknownError'));
		}
	}
}
