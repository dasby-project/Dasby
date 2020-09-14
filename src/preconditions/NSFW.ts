import type { Message } from 'discord.js';
import { Precondition, UserError, ok, err } from '@sapphire/framework';

export class DasbyPrecondition extends Precondition {
	public async run(message: Message) {
		return Reflect.get(message.channel, 'nsfw') === true
			? ok()
			: err(new UserError(this.name, await message.fetchLanguageKey('preconditions/NSFW:errorMessage')));
	}
}
