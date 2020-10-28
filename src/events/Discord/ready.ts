import { DbSet } from '@lib/structures/DbSet';
import { ApplyOptions } from '@sapphire/decorators';
import { Event, EventOptions, Events } from '@sapphire/framework';

@ApplyOptions<EventOptions>({
	event: Events.Ready
})
export default class extends Event<Events.CommandDenied> {
	public async run() {
		await DbSet.connect();
	}
}
