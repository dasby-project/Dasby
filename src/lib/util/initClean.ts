import { PGSQL_DATABASE_PASSWORD, TOKENS } from '@root/config';
import { initClean } from '@utils/clean';

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */

const raw = Object.values(TOKENS)
	.concat([PGSQL_DATABASE_PASSWORD])
	.filter((value) => typeof value === 'string' && value !== '');

initClean([...new Set(raw)]);
