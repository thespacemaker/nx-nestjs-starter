import type { DeleteStoreByIdPayload } from '../../../contracts';

export class DeleteStoreCommand {
	constructor(public readonly payload: DeleteStoreByIdPayload) {}
}
