import type { Type } from '@nestjs/common';
import type { IEventHandler } from '@nestjs/cqrs';

export const STORE_EVENTS_HANDLERS: Type<IEventHandler>[] = [];
