import type { Message } from 'discord.js';
import { Precondition, UserError, ok, err } from '@sapphire/framework';

export class DasbyPrecondition extends Precondition {
	public async run(message: Message) {
		return message.guild === null
			? err(new UserError(this.name, await message.fetchLanguageKey('preconditions/core:GuildOnly.errorMessage')))
			: ok();
	}
}
