import { PREFIX } from '@root/config';
import { SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { join } from 'path';
import { container } from 'tsyringe';

import '@scp/in17n/register';

export class DasbyClient extends SapphireClient {
	public constructor(options?: ClientOptions) {
		super(options);
		this.arguments.registerPath(join(__dirname, '..', 'arguments'));
		this.commands.registerPath(join(__dirname, '..', 'commands'));
		this.events.registerPath(join(__dirname, '..', 'events'));
		this.preconditions.registerPath(join(__dirname, '..', 'preconditions'));
		container.registerInstance(DasbyClient, this);
	}

	public fetchPrefix = () => PREFIX;
	public fetchLanguage = () => 'es-ES';
}
