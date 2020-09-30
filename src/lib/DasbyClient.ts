/* eslint-disable @typescript-eslint/no-invalid-this */
// dependencies
import { SapphireClient } from '@sapphire/framework';
import { container } from 'tsyringe';
import type { ClientOptions, Message } from 'discord.js';
import { join } from 'path';
import Redis, { Redis as IORedis } from 'ioredis';
import { CacheManager } from '@utils/Helpers/Cache/CacheManager';
import { DbSet } from './structures/DbSet';

// configs
import { PREFIX } from '@root/config';

// Plugins
import '@scp/in17n/register';

// Enums
import { CacheKey } from '@utils/enums';

export class DasbyClient extends SapphireClient {
	public readonly redis: IORedis = new Redis();
	public readonly cache: CacheManager = new CacheManager(this);
	public constructor(options?: ClientOptions) {
		super(options);
		this.arguments.registerPath(join(__dirname, '..', 'arguments'));
		this.commands.registerPath(join(__dirname, '..', 'commands'));
		this.events.registerPath(join(__dirname, '..', 'events'));
		this.preconditions.registerPath(join(__dirname, '..', 'preconditions'));

		container.registerInstance(DasbyClient, this);
	}

	public fetchPrefix = async (message: Message) => {
		if (message.guild) {
			const prefix = await this.cache.get(message.id, CacheKey.GuildPrefix);
			if (prefix !== null) return prefix;
			const { guilds } = await DbSet.connect();
			const settings = await guilds.ensure(message.id);
			await this.cache.set(message.id, settings.prefix, CacheKey.GuildPrefix);
			await settings.save();
			return settings.prefix;
		}
		return PREFIX;
	};

	public fetchLanguage = () => 'es-ES';
}
