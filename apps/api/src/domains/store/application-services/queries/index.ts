import { GetStoreByIdQueryHandler } from './get-store-by-id/get-store-by-id.query-handler';
import { GetStoresQueryHandler } from './get-stores/get-stores.query-handler';

import type { Type } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';

export * from './get-store-by-id/get-store-by-id.query';
export * from './get-store-by-id/get-store-by-id.query-handler';
export * from './get-stores/get-stores.query';
export * from './get-stores/get-stores.query-handler';

export const STORE_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
	GetStoreByIdQueryHandler,
	GetStoresQueryHandler,
];
