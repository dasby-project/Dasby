import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';

const truths = ['1', 'true', '+', 't', 'yes', 'y', 'on'];
const falses = ['0', 'false', '-', 'f', 'no', 'n', 'off'];

export class DasbyArgument extends Argument<boolean> {
	public constructor(context: PieceContext) {
		super(context, { name: 'boolean' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<boolean> {
		const boolean = String(argument).toLowerCase();
		if (truths.includes(boolean)) return this.ok(true);
		if (falses.includes(boolean)) return this.ok(false);
		return this.error(argument, 'BooleanArgumentInvalidBoolean', await context.message.fetchLanguageKey('arguments/core:boolean.invalid'));
	}
}
