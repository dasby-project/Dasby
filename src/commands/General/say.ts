import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	description: 'commands/general:say.description',
	detailedDescription: 'commands/general:say.extended'
})
export class DasbyCommand extends Command {
	public async run(message: Message, args: Args) {
		const sayMessage = await args.rest('string').catch(() => null);
		if (message.deletable) await message.delete().catch(() => null);
		if (!sayMessage) {
			return message.reply(await message.fetchLanguageKey('commands/general:say.messageEmpty')).then((msg) => msg.delete({ timeout: 6000 }));
		}
		return message.channel.send(sayMessage);
	}
}
