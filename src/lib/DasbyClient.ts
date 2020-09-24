// configs
import { PREFIX, ENABLE_INFLUX, INFLUX_OPTIONS, INFLUX_ORG, INFLUX_ORG_ANALYTICS_BUCKET } from '@root/config';

// dependencies
import { SapphireClient } from '@sapphire/framework';
import { container } from 'tsyringe';
import { enumerable } from '@sapphire/decorators';
import type { ClientOptions } from 'discord.js';
import { join } from 'path';
import { InfluxDB, QueryApi, WriteApi, WritePrecision } from '@influxdata/influxdb-client';

// Plugins
import '@scp/in17n/register';

export class DasbyClient extends SapphireClient {
	@enumerable(false)
	public influx: InfluxDB | null = ENABLE_INFLUX ? new InfluxDB(INFLUX_OPTIONS) : null;

	public analytics: WriteApi | null = null;
	public analyticsReader: QueryApi | null = null;

	public constructor(options?: ClientOptions) {
		super(options);
		this.arguments.registerPath(join(__dirname, '..', 'arguments'));
		this.commands.registerPath(join(__dirname, '..', 'commands'));
		this.events.registerPath(join(__dirname, '..', 'events'));
		this.preconditions.registerPath(join(__dirname, '..', 'preconditions'));

		container.registerInstance(DasbyClient, this);

		if (ENABLE_INFLUX) {
			this.analytics = this.influx!.getWriteApi(INFLUX_ORG, INFLUX_ORG_ANALYTICS_BUCKET, WritePrecision.s);
			this.analyticsReader = this.influx!.getQueryApi(INFLUX_ORG);
		}
	}

	public fetchPrefix = () => PREFIX;
	public fetchLanguage = () => 'es-ES';
}
