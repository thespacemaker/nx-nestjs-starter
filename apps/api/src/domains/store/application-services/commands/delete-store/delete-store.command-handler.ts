import { CommandHandler } from '@nestjs/cqrs';

import { AbstractStoreRepository } from '../../../providers';
import { DeleteStoreCommand } from './delete-store.command';

import type { ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteStoreCommand)
export class DeleteStoreCommandHandler
	implements ICommandHandler<DeleteStoreCommand, boolean>
{
	constructor(private readonly storeRepository: AbstractStoreRepository) {}

	public async execute({ payload }: DeleteStoreCommand): Promise<boolean> {
		return await this.storeRepository.delete(payload.data.id);
	}
}
