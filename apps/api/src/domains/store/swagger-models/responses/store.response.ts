import { BaseResponse } from '@nestjs-starter/api/modules/core';

import { StoreModel } from '../models';

export const StoreResponse = BaseResponse(StoreModel);
