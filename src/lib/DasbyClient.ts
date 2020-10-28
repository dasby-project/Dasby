import { SapphireClient } from '@sapphire/framework';
import { container } from 'tsyringe';
import type { ClientOptions, Message } from 'discord.js';
import { join } from 'path';
import { DbSet } from './structures/DbSet';

import '@scp/in17n/register';
import { PREFIX, DEV, VERSION } from '@root/config';

export class DasbyClient extends SapphireClient {
	/**
	 * userAgent
	 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
	 */
	public userAgent: string;
	public constructor(options?: ClientOptions) {
		super(options);
		this.arguments.registerPath(join(__dirname, '..', 'arguments'));
		this.commands.registerPath(join(__dirname, '..', 'commands'));
		this.events.registerPath(join(__dirname, '..', 'events'));
		this.preconditions.registerPath(join(__dirname, '..', 'preconditions'));
		this.userAgent = DEV ? `DasbyDiscordBot/${VERSION} Development` : `DasbyDiscordBot/${VERSION} Production`;
		container.registerInstance(DasbyClient, this);
	}

	public async ensureSettings(id: string) {
		const { guilds } = await DbSet.connect();
		return guilds.ensure(id);
	}

	public fetchPrefix = async (message: Message) => {
		if (message.guild) {
			const settings = await this.ensureSettings(message.id);
			await settings.save();
			return settings.prefix;
		}
		return PREFIX;
	};

	public fetchLanguage = () => 'es-ES';
}
