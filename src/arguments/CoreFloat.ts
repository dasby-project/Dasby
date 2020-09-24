import type { PieceContext } from '@sapphire/pieces';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<number> {
	public constructor(context: PieceContext) {
		super(context, { name: 'float' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<number> {
		const parsed = Number(argument);

		if (Number.isNaN(parsed)) {
			return this.error(argument, 'ArgumentFloatInvalidFloat', await context.message.fetchLanguageKey('arguments/core:float.invalidFloat'));
		}
		if (typeof context.minimum === 'number' && parsed < context.minimum) {
			return this.error(argument, 'ArgumentFloatTooSmall', await context.message.fetchLanguageKey('arguments/core:float.tooSmall'));
		}
		if (typeof context.maximum === 'number' && parsed > context.maximum) {
			return this.error(argument, 'ArgumentFloatTooBig', await context.message.fetchLanguageKey('arguments/core:float.tooBig'));
		}

		return this.ok(parsed);
	}
}
