import type { CommandOptions, Args } from '@sapphire/framework';
import { DasbyCommand } from '@lib/structures/Command';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { DasbyEmbed } from '@lib/structures/Embed';

@ApplyOptions<CommandOptions>({
	aliases: ['av'],
	description: 'commands/tools:avatar.description',
	detailedDescription: 'commands/tools:avatar.extended'
})
export default class extends DasbyCommand {
	public async run(message: Message, args: Args) {
		const user = await args.pick('user').catch(() => message.author);
		const embed = new DasbyEmbed()
			.setTitle(await message.fetchLanguageKey('commands/tools:avatar.title', { userTag: `${user.tag}` }))
			.setColor('RANDOM')
			.setImage(user.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }))
			.setTimestamp();
		if (user !== message.author) {
			embed.setFooter(await message.fetchLanguageKey('commands/tools:avatar.footer', { authorTag: `${message.author.tag}` }));
		}
		return message.channel.send({ embed });
	}
}
