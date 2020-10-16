import type { CommandOptions, Args } from '@sapphire/framework';
import { DasbyCommand } from '@lib/structures/Command';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { codeBlock } from '@sapphire/utilities';
import { exec } from '@klasa/utils';
import { PreConditions } from '@utils/enums';

@ApplyOptions<CommandOptions>({
	description: 'commands/system:exec.description',
	detailedDescription: 'commands/system:exec.extended',
	preconditions: [PreConditions.OwnerOnly]
})
export default class extends DasbyCommand {
	public async run(message: Message, args: Args) {
		const input = await args.rest('string').catch(() => null);
		if (!input) return;
		const result = await exec(input, { timeout: 60000 }).catch((error) => ({ stdout: null, stderr: error }));
		const output = result.stdout ? `**\`SALIDA\`**${codeBlock('prolog', result.stdout)}` : '';
		const outerr = result.stderr ? `**\`ERROR\`**${codeBlock('prolog', result.stderr)}` : '';
		return message.channel.send([output, outerr].join('\n') || 'No hay salida');
	}
}
