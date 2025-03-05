import type { OrderDirection } from '@nestjs-starter/api/modules/core';
import type { IStore } from './store.interfaces';

export interface IStoreQuery {
	ids?: string[];
	search?: string;
	take?: number;
	skip?: number;
	orderBy?: keyof IStore;
	orderDirection?: OrderDirection;
}
