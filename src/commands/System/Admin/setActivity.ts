import type { CommandOptions, Args } from '@sapphire/framework';
import { DasbyCommand } from '@lib/structures/Command';
import type { Message, ActivityType } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { PreConditions } from '@utils/enums';
import { DasbyEmbed } from '@lib/structures/Embed';

@ApplyOptions<CommandOptions>({
	aliases: ['setgame'],
	description: 'commands/system:setactivity.description',
	detailedDescription: 'commands/system:setactivity.extended',
	preconditions: [PreConditions.OwnerOnly],
	strategyOptions: {
		options: ['type']
	}
})
export default class extends DasbyCommand {
	public async run(message: Message, args: Args) {
		const name = await args.rest('string');
		const type = args.getOption('type');
		await this.client.user!.setActivity(name, { type: ((type as unknown) as ActivityType) ?? 'PLAYING' });
		const embed = new DasbyEmbed().setColor('RANDOM').setDescription(`Mi actividad se ha establecido a **${type} ${name}**`);
		return message.channel.send({ embed });
	}
}
