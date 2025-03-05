import type { Type } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';

export const STORE_QUERIES_HANDLERS: Type<IQueryHandler>[] = [];
