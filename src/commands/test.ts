import { Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	description: 'commands/tools:avatar.description',
	detailedDescription: 'commands/tools:avatar.extended'
})
export class DasbyCommand extends Command {
	public async run(message: Message) {
		const object = await message.fetchLanguageKey('default:test.array', { returnObjects: true, test: 'test' });
		return console.log(typeof object, object);
	}
}
