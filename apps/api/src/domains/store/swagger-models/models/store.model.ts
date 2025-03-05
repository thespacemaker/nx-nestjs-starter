import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseModel } from '@nestjs-starter/api/modules/core';

import type { IStore } from '../../interfaces';

export class StoreModel extends BaseModel implements IStore {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	constructor(properties: StoreModel) {
		super();
		this.id = properties.id;
		this.name = properties.name;
		this.createdAt = properties.createdAt;
		this.updatedAt = properties.updatedAt;
	}
}
