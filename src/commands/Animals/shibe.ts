import { Command, CommandOptions } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { fetch, FetchResultTypes } from '@utils/utils';

@ApplyOptions<CommandOptions>({
	description: 'commands/misc:animals.description',
	detailedDescription: 'commands/misc:animals.extended'
})
export class DasbyCommand extends Command {
	public async run(message: Message) {
		const data = await fetch<[string]>('https://shibe.online/api/shibes?count=1', FetchResultTypes.JSON);
		return message.channel.send({
			embed: new MessageEmbed()
				.setImage(data[0])
				.setColor('RANDOM')
				.setFooter(await message.fetchLanguageKey('commands/animals:shibe.footer', { authorTag: `${message.author.tag}` }))
				.setTimestamp()
		});
	}
}
