import { Argument, ArgumentContext } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';

export class DasbyArgument extends Argument<number> {
	public constructor(context: PieceContext) {
		super(context, { name: 'integer' });
	}

	public async run(argument: string, context: ArgumentContext) {
		const parsed = Number(argument);

		if (!Number.isSafeInteger(parsed)) {
			return this.error(
				argument,
				'IntegerArgument',
				await context.message.fetchLanguageKey('arguments/core:integer.argumentIntegerInvalidNumber')
			);
		}
		if (typeof context.minimum === 'number' && parsed < context.minimum) {
			return this.error(argument, 'IntegerArgument', await context.message.fetchLanguageKey('arguments/core:integer.argumentIntegerTooSmall'));
		}
		if (typeof context.maximum === 'number' && parsed > context.maximum) {
			return this.error(argument, 'IntegerArgument', await context.message.fetchLanguageKey('arguments/core:integer.argumentIntegerTooBig'));
		}

		return this.ok(parsed);
	}
}
