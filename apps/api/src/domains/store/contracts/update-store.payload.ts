import type { StoreUpdateInput } from '../interfaces';
import type { BasePayload, GetByIdData } from '@nestjs-starter/api/modules/core';

export type UpdateStorePayload = BasePayload<GetByIdData & StoreUpdateInput>;
