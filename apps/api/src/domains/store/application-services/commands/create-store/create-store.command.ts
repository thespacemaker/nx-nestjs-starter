import type { CreateStorePayload } from '../../../contracts';

export class CreateStoreCommand {
	constructor(public readonly payload: CreateStorePayload) {}
}
