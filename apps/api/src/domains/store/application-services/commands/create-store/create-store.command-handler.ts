import { CommandHandler } from '@nestjs/cqrs';

import { AbstractStoreRepository } from '../../../providers';
import { CreateStoreCommand } from './create-store.command';

import type { ICommandHandler } from '@nestjs/cqrs';
import type { IStore } from '../../../interfaces';

@CommandHandler(CreateStoreCommand)
export class CreateStoreCommandHandler
	implements ICommandHandler<CreateStoreCommand, IStore>
{
	constructor(private readonly storeRepository: AbstractStoreRepository) {}

	public async execute({ payload }: CreateStoreCommand): Promise<IStore> {
		return await this.storeRepository.create(payload.data);
	}
}
