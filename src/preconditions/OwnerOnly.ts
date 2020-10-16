import { OWNER_ID } from '@root/config';
import { Precondition, UserError, ok, err } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class DasbyPrecondition extends Precondition {
	public async run(message: Message) {
		return message.author.id === OWNER_ID
			? ok()
			: err(new UserError(this.name, await message.fetchLanguageKey('preconditions/core:OwnerOnly.errorMessage')));
	}
}
