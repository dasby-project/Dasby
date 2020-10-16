import type { CommandOptions } from '@sapphire/framework';
import { DasbyCommand } from '@lib/structures/Command';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { DasbyEmbed } from '@lib/structures/Embed';

@ApplyOptions<CommandOptions>({
	description: 'commands/general:ping.description',
	detailedDescription: 'commands/general:ping.extended'
})
export default class extends DasbyCommand {
	public async run(message: Message) {
		const msg = await message.channel.send(new DasbyEmbed().setDescription(await message.fetchLanguageKey('commands/general:ping.message')));

		return msg.edit(
			new DasbyEmbed()
				.setAuthor(this.client.user!.username, this.client.user!.displayAvatarURL({ format: 'png', size: 128 }))
				.setColor('RANDOM')
				.setDescription(
					await message.fetchLanguageKey('commands/general:ping.response', {
						diff: `${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}`,
						ping: `${Math.round(this.client.ws.ping)}`
					})
				)
				.setTimestamp()
		);
	}
}
