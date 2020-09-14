import { Command, CommandOptions } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { fetch, FetchResultTypes } from '@utils/utils';

@ApplyOptions<CommandOptions>({
	description: 'commands/misc:sadcat.description',
	detailedDescription: 'commands/misc:sadcat.extended'
})
export class DasbyCommand extends Command {
	public async run(message: Message) {
		const data = await fetch<SadCatOk>('https://api.alexflipnote.dev/sadcat', FetchResultTypes.JSON);
		return message.channel.send({
			embed: new MessageEmbed()
				.setColor('RANDOM')
				.setImage(data.file)
				.setFooter(await message.fetchLanguageKey('commands/misc:sadcat.footer', { authorTag: `${message.author.tag}` }))
				.setTimestamp()
		});
	}
}

export interface SadCatOk {
	file: string;
}
