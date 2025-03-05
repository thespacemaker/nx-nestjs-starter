import type { Type } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';

export const STORE_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [];
