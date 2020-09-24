import type { PieceContext } from '@sapphire/pieces';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<number> {
	public constructor(context: PieceContext) {
		super(context, { name: 'number' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<number> {
		const parsed = Number(argument);

		if (Number.isNaN(parsed)) {
			return this.error(argument, 'ArgumentNumberInvalidNumber', await context.message.fetchLanguageKey('arguments/core:number.invalidNumber'));
		}
		if (typeof context.minimum === 'number' && parsed < context.minimum) {
			return this.error(argument, 'ArgumentNumberTooSmall', await context.message.fetchLanguageKey('arguments/core:number.tooSmall'));
		}
		if (typeof context.maximum === 'number' && parsed > context.maximum) {
			return this.error(argument, 'ArgumentNumberTooBig', await context.message.fetchLanguageKey('arguments/core:number.tooBig'));
		}

		return this.ok(parsed);
	}
}
