import { QueryHandler } from '@nestjs/cqrs';

import { GetStoreByIdQuery } from './get-store-by-id.query';
import { AbstractStoreRepository } from '../../../providers';

import type { IQueryHandler } from '@nestjs/cqrs';
import type { IStore } from '../../../interfaces';

@QueryHandler(GetStoreByIdQuery)
export class GetStoreByIdQueryHandler
	implements IQueryHandler<GetStoreByIdQuery, IStore | null>
{
	constructor(private readonly storeRepository: AbstractStoreRepository) {}

	public async execute({ payload: { data } }: GetStoreByIdQuery): Promise<IStore | null> {
		return await this.storeRepository.getById(data.id);
	}
}
