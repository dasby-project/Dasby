import { PREFIX } from '@root/config';
import { Entity, Check, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity('guild', { schema: 'public' })
@Check(/* sql */ `"prefix"::text <> ''::text`)
export class GuildEntity extends BaseEntity {
	@PrimaryColumn('varchar', { name: 'id', length: 19 })
	public id!: string;

	@Column('varchar', { name: 'prefix', length: 3, default: PREFIX })
	public prefix: string = PREFIX;

	@Column('varchar', { name: 'language', length: 10, default: 'es-ES' })
	public language = 'es-ES';
}
