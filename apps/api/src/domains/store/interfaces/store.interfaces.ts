import type { IBaseEntity } from '@nestjs-starter/api/modules/core';

export interface IStore extends IBaseEntity {
	name: string;
}

export type StoreCreateInput = Pick<IStore, 'name'>;

export type StoreUpdateInput = Partial<Pick<IStore, 'name'>>;
