import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';

export class DasbyArgument extends Argument<number> {
	public constructor(context: PieceContext) {
		super(context, { name: 'integer' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<number> {
		const parsed = Number(argument);

		if (!Number.isSafeInteger(parsed)) {
			return this.error(
				argument,
				'ArgumentIntegerInvalidNumber',
				await context.message.fetchLanguageKey('arguments/core:integer.invalidNumber')
			);
		}
		if (typeof context.minimum === 'number' && parsed < context.minimum) {
			return this.error(argument, 'ArgumentIntegerTooSmall', await context.message.fetchLanguageKey('arguments/core:integer.tooSmall'));
		}
		if (typeof context.maximum === 'number' && parsed > context.maximum) {
			return this.error(argument, 'ArgumentIntegerTooBig', await context.message.fetchLanguageKey('arguments/core:integer.tooBig'));
		}

		return this.ok(parsed);
	}
}
