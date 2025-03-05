import { GetStoresQuery } from './get-stores.query';
import { AbstractStoreRepository } from '../../../providers';

import type { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import type { IStore } from '../../../interfaces';

@QueryHandler(GetStoresQuery)
export class GetStoresQueryHandler implements IQueryHandler<[IStore, number]> {
	constructor(private readonly storeRepository: AbstractStoreRepository) {}

	public async execute({ payload }: GetStoresQuery): Promise<[IStore, number]> {
		return await this.storeRepository.getAll(payload);
	}
}
