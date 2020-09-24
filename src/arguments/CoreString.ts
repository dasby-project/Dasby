import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';

export class DasbyArgument extends Argument<string> {
	public constructor(context: PieceContext) {
		super(context, { name: 'string' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<string> {
		if (typeof context.minimum === 'number' && argument.length < context.minimum) {
			return this.error(argument, 'ArgumentStringTooShort', await context.message.fetchLanguageKey('arguments/core:string.tooShort'));
		}
		if (typeof context.maximum === 'number' && argument.length > context.maximum) {
			return this.error(argument, 'ArgumentStringTooLong', await context.message.fetchLanguageKey('arguments/core:string.tooLong'));
		}

		return this.ok(argument);
	}
}
