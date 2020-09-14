import { OWNER_ID } from '@root/config';
import { Precondition, Awaited, Result, UserError, ok, err } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class OwnerOnly extends Precondition {
	public run(message: Message): Awaited<Result<unknown, UserError>> {
		return message.author.id === OWNER_ID ? ok() : err(new UserError('ownerOnly', 'Este comando solo puede ser usado por el dueño.'));
	}
}
