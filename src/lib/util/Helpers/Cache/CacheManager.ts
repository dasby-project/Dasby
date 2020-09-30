import type { DasbyClient } from '@lib/DasbyClient';
import type { CacheKey } from '@utils/enums';

export class CacheManager {
	private readonly _client: DasbyClient;
	public constructor(client: DasbyClient) {
		this._client = client;
	}

	public set(key: string, value: string, type: CacheKey) {
		return this._client.redis.set(`${type}_${key}`, value);
	}

	public get(key: string, type: CacheKey) {
		return this._client.redis.get(`${type}_${key}`);
	}

	public async has(key: string, type: CacheKey) {
		return Boolean(await this.get(key, type));
	}
}
