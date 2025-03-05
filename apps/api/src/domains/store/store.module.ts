import { Global, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '@nestjs-starter/api/modules/global';

import { AbstractStoreRepository, PrismaStoreRepository } from './providers';
import {
	STORE_COMMANDS_HANDLERS,
	STORE_EVENTS_HANDLERS,
	STORE_QUERIES_HANDLERS,
	StoreFacade,
} from './application-services';
import { storeFacadeFactory } from './factories';
import { StoreMutationsController, StoreQueriesController } from './controllers';

@Global()
@Module({
	imports: [CqrsModule],
	providers: [
		PrismaService,
		{
			provide: AbstractStoreRepository,
			useClass: PrismaStoreRepository,
		},
		{
			provide: StoreFacade,
			inject: [CommandBus, QueryBus, EventBus],
			useFactory: storeFacadeFactory,
		},
		...STORE_COMMANDS_HANDLERS,
		...STORE_EVENTS_HANDLERS,
		...STORE_QUERIES_HANDLERS,
	],
	controllers: [StoreQueriesController, StoreMutationsController],
	exports: [StoreFacade, AbstractStoreRepository],
})
export class StoreModule implements OnModuleInit {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	public onModuleInit(): void {
		this.commandBus.register(STORE_COMMANDS_HANDLERS);
		this.queryBus.register(STORE_QUERIES_HANDLERS);
	}
}
