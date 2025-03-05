import type { UpdateStorePayload } from '../../../contracts';

export class UpdateStoreCommand {
	constructor(public readonly payload: UpdateStorePayload) {}
}
