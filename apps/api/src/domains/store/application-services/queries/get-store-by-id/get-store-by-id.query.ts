import type { GetStoreByIdPayload } from '../../../contracts';

export class GetStoreByIdQuery {
	constructor(public readonly payload: GetStoreByIdPayload) {}
}
