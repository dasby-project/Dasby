import { Command, CommandOptions, PieceContext } from '@sapphire/framework';
import { relative, sep } from 'path';

export abstract class DasbyCommand extends Command {
	/**
	 * Muestra las categorias de un comando
	 * @since 1.0.0
	 * @type {string[]}
	 */
	public fullCategory: string[];

	protected constructor(context: PieceContext, options?: CommandOptions) {
		super(context, options);
		this.fullCategory = relative([...this.store.paths][0], this.path)
			.split(sep)
			.slice(0, -1);
	}

	/**
	 * Muestra la categoria
	 * @since 1.0.0
	 * @type {string}
	 */
	public get category() {
		return this.fullCategory[0] ?? 'General';
	}

	/**
	 * Muestra la sub categoria
	 * @since 1.0.0
	 * @type {string}
	 */
	public get subCategory() {
		return this.fullCategory[1] ?? 'General';
	}

	public toJSON(): Record<string, any> {
		return {
			...super.toJSON(),
			description: this.description,
			detailedDescription: this.detailedDescription,
			fullCategory: this.fullCategory,
			strategy: this.strategy
		};
	}
}
