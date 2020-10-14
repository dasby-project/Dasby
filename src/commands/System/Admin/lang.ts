import type { CommandOptions, Args } from '@sapphire/framework';
import { DasbyCommand } from '@lib/structures/Command';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { PreConditions } from '@utils/enums';
@ApplyOptions<CommandOptions>({
	preconditions: [PreConditions.OwnerOnly]
})
export default class extends DasbyCommand {
	public async run(message: Message, args: Args) {
		const lang = await args.pick('string');
		return message.channel.send(await message.fetchLanguageKey(lang));
	}
}
