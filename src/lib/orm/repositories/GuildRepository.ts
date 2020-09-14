import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { GuildEntity } from '../entities/GuildEntity';

@EntityRepository(GuildEntity)
export class GuildRepository extends Repository<GuildEntity> {
	public async ensure(id: string, options?: FindOneOptions<GuildEntity>) {
		const existing = await this.findOne(id, options);
		if (existing) return existing;

		const data = new GuildEntity();

		data.id = id;

		return data;
	}
}
