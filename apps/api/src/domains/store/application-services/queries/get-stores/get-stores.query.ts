import type { GetStoresPayload } from '../../../contracts';

export class GetStoresQuery {
	constructor(public readonly payload: GetStoresPayload) {}
}
