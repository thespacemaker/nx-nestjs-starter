import {
	Body,
	Controller,
	Delete,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HttpStatus } from '@nestjs-starter/shared/types';
import { DeletedResponse } from '@nestjs-starter/api/modules/core';

import { StoreFacade } from '../application-services';
import { CreateStoreBody, StoreResponse, UpdateStoreBody } from '../swagger-models';

import type { ICommonResponseInterface } from '@nestjs-starter/shared/types';
import type { IStore } from '../interfaces';

@Controller('stores')
@ApiTags('Stores')
export class StoreMutationsController {
	constructor(private readonly storeFacade: StoreFacade) {}

	@Post()
	@ApiOperation({ summary: 'Create a new store' })
	@ApiBody({ type: CreateStoreBody })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Store created successfully',
		type: StoreResponse,
	})
	@HttpCode(HttpStatus.CREATED)
	public async create(
		@Body() createStoreDto: CreateStoreBody,
	): Promise<ICommonResponseInterface<IStore>> {
		const data = await this.storeFacade.commands.create({
			data: createStoreDto,
		});

		return {
			status: HttpStatus.CREATED,
			message: 'Store created successfully',
			data,
		};
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update an existing store' })
	@ApiParam({ name: 'id', type: String, description: 'Store ID' })
	@ApiBody({ type: UpdateStoreBody })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Store updated successfully',
		type: StoreResponse,
	})
	public async update(
		@Param('id') id: string,
		@Body() updateStoreDto: UpdateStoreBody,
	): Promise<ICommonResponseInterface<IStore>> {
		const existsData = await this.storeFacade.queries.getById({ data: { id } });

		if (!existsData) {
			throw new NotFoundException(`Store with id ${id} not found`);
		}

		const data = await this.storeFacade.commands.update({
			data: { id, ...updateStoreDto },
		});

		return {
			status: HttpStatus.OK,
			message: 'Store updated successfully',
			data,
		};
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a store by ID' })
	@ApiParam({ name: 'id', type: String, description: 'Store ID' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Store deleted successfully',
		type: DeletedResponse,
	})
	public async delete(
		@Param('id') id: string,
	): Promise<ICommonResponseInterface<{ status: boolean }>> {
		const existsData = await this.storeFacade.queries.getById({ data: { id } });

		if (!existsData) {
			throw new NotFoundException(`Store with id ${id} not found`);
		}

		const data = await this.storeFacade.commands.delete({ data: { id } });

		return {
			status: HttpStatus.OK,
			message: 'Store deleted successfully',
			data: { status: data },
		};
	}
}
