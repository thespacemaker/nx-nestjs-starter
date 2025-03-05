import type { GetStoresPayload } from '../../../contracts/get-stores.payload';

export class GetStoresQuery {
	constructor(public readonly payload: GetStoresPayload) {}
}
