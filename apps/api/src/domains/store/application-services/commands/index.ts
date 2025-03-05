import { CreateStoreCommandHandler } from './create-store/create-store.command-handler';
import { DeleteStoreCommandHandler } from './delete-store/delete-store.command-handler';
import { UpdateStoreCommandHandler } from './update-store/update-store.command-handler';

import type { Type } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';

export * from './create-store/create-store.command';
export * from './create-store/create-store.command-handler';
export * from './delete-store/delete-store.command';
export * from './delete-store/delete-store.command-handler';
export * from './update-store/update-store.command';
export * from './update-store/update-store.command-handler';

export const STORE_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
	CreateStoreCommandHandler,
	DeleteStoreCommandHandler,
	UpdateStoreCommandHandler,
];
