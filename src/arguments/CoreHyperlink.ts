import type { PieceContext } from '@sapphire/pieces';
import { URL } from 'url';
import { Argument, AsyncArgumentResult, ArgumentContext } from '@sapphire/framework';

export class CoreArgument extends Argument<URL> {
	public constructor(context: PieceContext) {
		super(context, { name: 'hyperlink', aliases: ['url'] });
	}

	public async run(argument: string, context: ArgumentContext): AsyncArgumentResult<URL> {
		try {
			return this.ok(new URL(argument));
		} catch {
			return this.error(argument, 'ArgumentHyperlinkInvalidURL', await context.message.fetchLanguageKey('arguments/core:hyperlink.invalidURL'));
		}
	}
}
