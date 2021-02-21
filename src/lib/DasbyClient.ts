import { SapphireClient } from '@sapphire/framework';
import { container } from 'tsyringe';
import type { ClientOptions } from 'discord.js';

// Plugins
import '@sapphire/plugin-i18next/register';
import '@sapphire/plugin-logger/register';

export class DasbyClient extends SapphireClient {
	public constructor(options?: ClientOptions) {
		super(options);
		container.registerInstance(DasbyClient, this);
	}

	public fetchPrefix = () => '-';

	public fetchLanguage = () => 'es-ES';
}
