import { Argument, ArgumentContext } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import type { User } from 'discord.js';

export class DasbyArgument extends Argument<User> {
	public userOrMemberRegex = /^(?:<@!?)?(\d{17,19})>?$/;

	public constructor(context: PieceContext) {
		super(context, { name: 'user' });
	}

	public async run(argument: string, context: ArgumentContext) {
		if (!argument) return this.error(argument, 'UserArgumentNotProvided', await context.message.fetchLanguageKey('arguments/user:notProvided'));

		const userID = this.userOrMemberRegex.exec(argument);
		const user = userID ? await this.client.users.fetch(userID![1]).catch(() => null) : null;

		if (!user) return this.error(argument, 'UserArgumentNotFound', await context.message.fetchLanguageKey('arguments/user:notFound'));
		return this.ok(user);
	}
}
