import type { CommandOptions } from '@sapphire/framework';
import { DasbyCommand } from '@lib/structures/Command';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { fetch, FetchResultTypes } from '@utils/utils';
import { DasbyEmbed } from '@lib/structures/Embed';

@ApplyOptions<CommandOptions>({
	description: 'commands/misc:sadcat.description',
	detailedDescription: 'commands/misc:sadcat.extended'
})
export default class extends DasbyCommand {
	public async run(message: Message) {
		const data = await fetch<SadCatOk>('https://api.alexflipnote.dev/sadcat', FetchResultTypes.JSON);
		return message.channel.send({
			embed: new DasbyEmbed()
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
