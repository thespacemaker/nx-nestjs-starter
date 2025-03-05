import type { Any } from '@nestjs-starter/shared/types';

export interface MetaPayload {
	initiator?: string;
	requestId?: string;
	originClass?: string;
	originMethod: string;
	ip?: string;
}

export type BasePayload<T extends Record<string, Any> = NonNullable<unknown>> = {
	data: T;
	meta: MetaPayload;
};

export type GetByIdData = { id: string };
