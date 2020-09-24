import type { PieceContext } from '@sapphire/pieces';
import { Argument, ArgumentContext, AsyncArgumentResult } from '@sapphire/framework';

export class CoreArgument extends Argument<Date> {
	public constructor(context: PieceContext) {
		super(context, { name: 'date' });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<Date> {
		const parsed = new Date(argument);
		const time = parsed.getTime();

		if (Number.isNaN(time)) {
			return this.error(argument, 'ArgumentDateInvalidNumber', await context.message.fetchLanguageKey('arguments/core:date.invalidNumber'));
		}
		if (typeof context.minimum === 'number' && time < context.minimum) {
			return this.error(argument, 'ArgumentDateTooSmall', await context.message.fetchLanguageKey('arguments/core:date.tooSmall'));
		}
		if (typeof context.maximum === 'number' && time > context.maximum) {
			return this.error(argument, 'ArgumentDateTooBig', await context.message.fetchLanguageKey('arguments/core:date.tooBig'));
		}

		return this.ok(parsed);
	}
}
