import { PickType } from '@nestjs/swagger';

import { StoreModel } from '../models';

import type { StoreCreateInput } from '../../interfaces';

export class CreateStoreBody
	extends PickType(StoreModel, ['name'])
	implements StoreCreateInput
{
	constructor(properties: Partial<StoreCreateInput> = {}) {
		super();
		this.name = properties.name || '';
	}
}
