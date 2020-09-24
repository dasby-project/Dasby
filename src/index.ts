import 'module-alias/register';
import '@utils/initClean';
import 'reflect-metadata';
import { DasbyClient } from '@lib/DasbyClient';
import { CLIENT_OPTIONS, TOKENS } from '@root/config';
import { DbSet } from '@lib/structures/DbSet';
import { floatPromise } from '@utils/utils';
const client = new DasbyClient(CLIENT_OPTIONS);
async function main() {
	try {
		await DbSet.connect();
		await client.login(TOKENS.BOT_TOKEN);
	} catch (error) {
		client.destroy();
		throw error;
	}
}

floatPromise({ client }, main());
