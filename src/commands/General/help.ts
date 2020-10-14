import { CommandOptions, isErr } from '@sapphire/framework';
import { DasbyCommand } from '@lib/structures/Command';
import { Message, Collection } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	description: 'commands/general:help.description',
	detailedDescription: 'commands/general:help.extended'
})
export default class extends DasbyCommand {
	public async run(message: Message) {}

	private async _fetchCommands(message: Message) {
		const commands = new Collection<string, DasbyCommand[]>();
		await Promise.all(
			this.client.commands.map(async (command) => {
				const result = await command.preconditions.run(message, command);
				if (!isErr(result)) {
					const category = commands.get(command.fullCategory.join(' -> '));
					if (category) category.push(command);
					else commands.set(command.fullCategory.join(' -> '), [command]);
				}
				return null;
			})
		);
	}
}
