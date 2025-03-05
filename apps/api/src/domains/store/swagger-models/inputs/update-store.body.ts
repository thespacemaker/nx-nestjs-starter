import { PartialType, PickType } from '@nestjs/swagger';

import { StoreModel } from '../models';

import type { StoreUpdateInput } from '../../interfaces';

export class UpdateStoreBody
	extends PartialType(PickType(StoreModel, ['name']))
	implements StoreUpdateInput
{
	constructor(properties: StoreUpdateInput) {
		super();
		this.name = properties.name;
	}
}
