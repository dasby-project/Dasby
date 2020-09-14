import { Argument, ArgumentContext } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';

export class DasbyArgument extends Argument<string> {
	public constructor(context: PieceContext) {
		super(context, { name: 'string' });
	}

	public async run(argument: string, context: ArgumentContext) {
		if (typeof context.minimum === 'number' && argument.length < context.minimum) {
			return this.error(argument, 'StringArgument', await context.message.fetchLanguageKey('arguments/core:string.argumentStringTooShort'));
		}
		if (typeof context.maximum === 'number' && argument.length > context.maximum) {
			return this.error(argument, 'StringArgument', await context.message.fetchLanguageKey('arguments/core:string.argumentStringTooLong'));
		}

		return this.ok(argument);
	}
}
