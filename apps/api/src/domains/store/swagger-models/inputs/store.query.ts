import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderDirection } from '@nestjs-starter/api/modules/core';

import type { IStore, IStoreQuery } from '../../interfaces';

export class StoreQuery implements IStoreQuery {
	@ApiPropertyOptional({ description: 'Array of store IDs to retrieve', type: [String] })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[];

	@ApiPropertyOptional({
		description: 'Field to order by',
		enum: ['name', 'createdAt', 'updatedAt'],
	})
	@IsOptional()
	@IsString()
	orderBy?: keyof IStore;

	@ApiPropertyOptional({
		description: 'Order direction',
		enum: OrderDirection,
		default: OrderDirection.asc,
	})
	@IsOptional()
	@IsEnum(OrderDirection)
	orderDirection?: OrderDirection;

	@ApiPropertyOptional({ description: 'Search term to filter by name or address' })
	@IsOptional()
	@IsString()
	search?: string;

	@ApiPropertyOptional({
		description: 'Number of records to skip',
		type: Number,
		default: 0,
	})
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	skip?: number;

	@ApiPropertyOptional({
		description: 'Number of records to take',
		type: Number,
		default: 10,
	})
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	take?: number;
}
