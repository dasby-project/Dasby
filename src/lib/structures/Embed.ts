import { MessageEmbed, MessageEmbedOptions } from 'discord.js';

export class DasbyEmbed extends MessageEmbed {
	public constructor(data?: DasbyEmbed | MessageEmbedOptions) {
		super(data);
	}

	public addBetterField(name: string, value: string, space = false) {
		this.description = this.description ?? '';
		this.description += `${space ? '\n' : ''}\n**${name}:** ${value}`;
		return this;
	}
}
