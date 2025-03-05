import type { IBaseFacade } from '@nestjs-starter/api/modules/core';
import type { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

export class StoreFacade implements IBaseFacade {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly eventBus: EventBus,
	) {}

	commands = {};
	events = {};
	queries = {};
}
