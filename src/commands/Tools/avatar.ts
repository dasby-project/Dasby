import { Command, CommandOptions, Args } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
	description: 'commands/tools:avatar.description',
	detailedDescription: 'commands/tools:avatar.extended'
})
export class DasbyCommand extends Command {
	public async run(message: Message, args: Args) {
		const user = await args.pick('user').catch(() => message.author);
		const embed = new MessageEmbed()
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
