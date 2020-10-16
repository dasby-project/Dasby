import { DasbyEmbed } from '@lib/structures/Embed';
import { ApplyOptions } from '@sapphire/decorators';
import { CommandDeniedPayload, Event, EventOptions, Events, UserError } from '@sapphire/framework';

@ApplyOptions<EventOptions>({
	event: Events.CommandDenied
})
export default class extends Event<Events.CommandDenied> {
	public run(error: UserError, { message }: CommandDeniedPayload) {
		const errorEmbed = new DasbyEmbed().setTitle(`Error: ${error.identifier}`).setColor('ff0600').setDescription(error.message);
		return message.channel.send(errorEmbed);
	}
}
