import { PGSQL, DEV } from '@root/config';
import { join } from 'path';
import { Connection, ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export const config: ConnectionOptions = {
	type: 'postgres',
	host: PGSQL.HOST,
	port: PGSQL.PORT,
	username: PGSQL.USER,
	password: PGSQL.PASSWORD,
	database: PGSQL.NAME,
	entities: [join(__dirname, 'entities/*.js')],
	migrations: [join(__dirname, 'migrations/*.js')],
	cli: {
		entitiesDir: 'src/lib/orm/entities',
		migrationsDir: 'src/lib/orm/migrations',
		subscribersDir: 'src/lib/orm/subscribers'
	},
	namingStrategy: new SnakeNamingStrategy(),
	logging: DEV
};

export const connect = (): Promise<Connection> => {
	try {
		return Promise.resolve(getConnection());
	} catch {
		return createConnection(config);
	}
};
