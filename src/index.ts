import 'module-alias/register';
import 'reflect-metadata';
import { DasbyClient } from '@lib/DasbyClient';
import { noop } from '@sapphire/utilities';
import { TOKENS, CLIENT_OPTIONS } from '@root/config';

const client = new DasbyClient(CLIENT_OPTIONS);

async function main() {
	try {
		await client.login(TOKENS.BOT_TOKEN);
	} catch (error) {
		client.destroy();
		throw error;
	}
}

main().catch(() => noop);
