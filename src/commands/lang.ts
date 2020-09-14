import { Command, Args } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class DasbyCommand extends Command {
	public async run(message: Message, args: Args) {
		const lang = await args.pick('string');
		return message.channel.send(await message.fetchLanguageKey(lang));
	}
}
