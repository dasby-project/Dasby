import type { CommandOptions, Args } from '@sapphire/framework';
import { DasbyCommand } from '@lib/structures/Command';
import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { Stopwatch } from '@klasa/stopwatch';
import { Type } from '@klasa/type';
import { PreConditions } from '@utils/enums';
import { inspect } from 'util';
import { clean } from '@utils/clean';

@ApplyOptions<CommandOptions>({
	aliases: ['ev'],
	description: 'commands/system:eval.description',
	detailedDescription: 'commands/system:eval.extended',
	preconditions: [PreConditions.OwnerOnly],
	strategyOptions: {
		flags: ['async', 'silent', 'showhidden'],
		options: ['depth']
	}
})
export default class extends DasbyCommand {
	public async run(message: Message, args: Args) {
		const code = await args.rest('string');
		const { success, result, time, type } = await this.eval(message, code, args);
		if (args.getFlags('silent')) return;
		return message.sendTranslated(success ? 'commands/system:eval.success' : 'commands/system:eval.error', [
			{
				output: codeBlock('js', result),
				type: codeBlock('ts', type),
				time
			}
		]);
	}

	private async eval(message: Message, code: string, args: Args): Promise<EvalResults> {
		const stopwatch = new Stopwatch();
		let success: boolean | undefined = undefined;
		let syncTime: string | undefined = undefined;
		let asyncTime: string | undefined = undefined;
		let result: unknown | undefined = undefined;
		let thenable = false;
		let type: Type | undefined = undefined;
		try {
			if (args.getFlags('async')) code = `(async () => {\n${code}\n})();`;
			// eslint-disable-next-line no-eval
			result = eval(code);
			syncTime = stopwatch.toString();
			type = new Type(result);
			if (isThenable(result)) {
				thenable = true;
				stopwatch.restart();
				result = await result;
				asyncTime = stopwatch.toString();
			}
			success = true;
		} catch (error) {
			if (!syncTime) syncTime = stopwatch.toString();
			if (!type) type = new Type(error);
			if (thenable && !asyncTime) asyncTime = stopwatch.toString();
			result = error;
			success = false;
		}
		stopwatch.stop();
		if (typeof result !== 'string') {
			const depth = args.getOption('depth');
			const showHidden = args.getFlags('showhidden');
			result =
				result instanceof Error
					? result.stack
					: inspect(result, {
							// eslint-disable-next-line radix
							depth: depth ? parseInt(depth) || 0 : 0,
							showHidden
					  });
		}
		return { success, type: type!, time: this.formatTime(syncTime, asyncTime ?? ''), result: clean(result as string) };
	}

	private formatTime(syncTime: string, asyncTime: string) {
		return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
	}
}

interface EvalResults {
	success: boolean;
	type: Type;
	time: string;
	result: string;
}
