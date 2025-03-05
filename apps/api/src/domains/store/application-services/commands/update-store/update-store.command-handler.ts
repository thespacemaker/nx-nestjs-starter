import { CommandHandler } from '@nestjs/cqrs';

import { UpdateStoreCommand } from './update-store.command';
import { AbstractStoreRepository } from '../../../providers';

import type { ICommandHandler } from '@nestjs/cqrs';
import type { IStore } from '../../../interfaces';

@CommandHandler(UpdateStoreCommand)
export class UpdateStoreCommandHandler
	implements ICommandHandler<UpdateStoreCommand, IStore | null>
{
	constructor(private readonly storeRepository: AbstractStoreRepository) {}

	public async execute({ payload }: UpdateStoreCommand): Promise<IStore | null> {
		const { id, ...properties } = payload.data;
		return await this.storeRepository.update(id, properties);
	}
}
