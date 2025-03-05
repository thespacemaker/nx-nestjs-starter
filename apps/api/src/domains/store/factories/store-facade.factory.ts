import { StoreFacade } from '../application-services';

import type { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

export const storeFacadeFactory = (
	commandBus: CommandBus,
	queryBus: QueryBus,
	eventBus: EventBus,
): StoreFacade => new StoreFacade(commandBus, queryBus, eventBus);
