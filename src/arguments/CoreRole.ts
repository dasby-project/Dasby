import type { PieceContext } from '@sapphire/pieces';
import type { Role } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<Role> {
	public constructor(context: PieceContext) {
		super(context, { name: 'role' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<Role> {
		const { guild } = context.message;
		if (!guild) {
			return this.error(argument, 'ArgumentRoleMissingGuild', await context.message.fetchLanguageKey('arguments/core:role.missingGuild'));
		}

		const role = guild.roles.cache.get(argument);
		if (!role) {
			return this.error(argument, 'ArgumentRoleMissingRole', await context.message.fetchLanguageKey('arguments/core:role.missingRole'));
		}

		return this.ok(role);
	}
}
