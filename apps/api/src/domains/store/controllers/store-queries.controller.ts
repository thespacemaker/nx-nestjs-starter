import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HttpStatus, type ICommonResponseInterface } from '@nestjs-starter/shared/types';

import { StoreListResponse, StoreQuery, StoreResponse } from '../swagger-models';
import { StoreFacade } from '../application-services';

import type { IStore } from '../interfaces';
import type { IPaginatedType } from '@nestjs-starter/api/modules/core';

@Controller('stores')
@ApiTags('Stores')
export class StoreQueriesController {
	constructor(private readonly storeFacade: StoreFacade) {}

	@Get(':id')
	@ApiOperation({ summary: 'Get a store by ID' })
	@ApiParam({ name: 'id', type: String, description: 'Store ID' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Store retrieved successfully',
		type: StoreResponse,
	})
	public async getById(
		@Param('id') id: string,
	): Promise<ICommonResponseInterface<IStore>> {
		const data = await this.storeFacade.queries.getById({ data: { id } });

		if (!data) {
			throw new NotFoundException(`Store with id ${id} not found`);
		}

		return {
			status: HttpStatus.OK,
			message: 'Store retrieved successfully',
			data,
		};
	}

	@Get()
	@ApiOperation({ summary: 'Get a list of stores' })
	@ApiQuery({ type: StoreQuery })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Stores retrieved successfully',
		type: StoreListResponse,
	})
	public async getAll(
		@Query() query: StoreQuery,
	): Promise<ICommonResponseInterface<IPaginatedType<IStore>>> {
		const [items, total] = await this.storeFacade.queries.getAll({ data: query });

		return {
			status: HttpStatus.OK,
			message: 'Stores retrieved successfully',
			data: {
				items,
				total,
			},
		};
	}
}
