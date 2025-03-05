import { GetStoreByIdQuery, GetStoresQuery } from './queries';
import { CreateStoreCommand, DeleteStoreCommand, UpdateStoreCommand } from './commands';

import type { IBaseFacade } from '@nestjs-starter/api/modules/core';
import type { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import type {
	CreateStorePayload,
	DeleteStoreByIdPayload,
	GetStoreByIdPayload,
	GetStoresPayload,
	UpdateStorePayload,
} from '../contracts';
import type { IStore } from '../interfaces';

export class StoreFacade implements IBaseFacade {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly eventBus: EventBus,
	) {}

	commands = {
		create: (payload: CreateStorePayload) => this.create(payload),
		delete: (payload: DeleteStoreByIdPayload) => this.delete(payload),
		update: (payload: UpdateStorePayload) => this.update(payload),
	};

	events = {};

	queries = {
		getById: (payload: GetStoreByIdPayload) => this.getById(payload),
		getAll: (payload: GetStoresPayload) => this.getAll(payload),
	};

	private async getById(payload: GetStoreByIdPayload): Promise<IStore | null> {
		return await this.queryBus.execute(new GetStoreByIdQuery(payload));
	}

	private async getAll(payload: GetStoresPayload): Promise<[IStore[], number]> {
		return await this.queryBus.execute(new GetStoresQuery(payload));
	}

	private async create(payload: CreateStorePayload): Promise<IStore | null> {
		return await this.commandBus.execute(new CreateStoreCommand(payload));
	}

	private async update(payload: UpdateStorePayload): Promise<IStore | null> {
		return await this.commandBus.execute(new UpdateStoreCommand(payload));
	}

	private async delete(payload: DeleteStoreByIdPayload): Promise<boolean> {
		return await this.commandBus.execute(new DeleteStoreCommand(payload));
	}
}
