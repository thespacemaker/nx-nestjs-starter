import { BaseResponse, Paginated } from '@nestjs-starter/api/modules/core';

import { StoreModel } from '../models';

export const StoreListResponse = BaseResponse(Paginated(StoreModel));
