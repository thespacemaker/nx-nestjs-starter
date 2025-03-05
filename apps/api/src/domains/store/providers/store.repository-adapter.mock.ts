import { Injectable } from '@nestjs/common';

import { AbstractStoreRepository } from './store.repository';

import type {
	IStore,
	IStoreQuery,
	StoreCreateInput,
	StoreUpdateInput,
} from '../interfaces';

@Injectable()
export class MockStoreRepository extends AbstractStoreRepository {
	private stores: IStore[] = [];
	private nextId = 1;

	public async getById(id: string): Promise<IStore | null> {
		const found = this.stores.find((store) => store.id === id);
		return found || null;
	}

	public async getAll(query: IStoreQuery): Promise<[IStore[], number]> {
		let filteredStores = [...this.stores]; // Copy to avoid modifying the original

		const { ids, orderBy } = query;

		if (ids) {
			filteredStores = filteredStores.filter((store) => ids.includes(store.id));
		}

		if (query.search) {
			const searchTerm = query.search.toLowerCase();
			filteredStores = filteredStores.filter((store) =>
				store.name.toLowerCase().includes(searchTerm),
			);
		}

		//Apply sorting
		if (orderBy) {
			filteredStores.sort((a, b) => {
				const order = query.orderDirection === 'asc' ? 1 : -1;
				if (a[orderBy] < b[orderBy]) return -1 * order;
				if (a[orderBy] > b[orderBy]) return 1 * order;
				return 0;
			});
		}

		const total = filteredStores.length;

		//Apply paging
		const skip = query.skip || 0;
		const take = query.take || total;
		const pagedStores = filteredStores.slice(skip, skip + take);

		return [pagedStores, total];
	}

	public async create(data: StoreCreateInput): Promise<IStore> {
		const newStore: IStore = {
			id: String(this.nextId++), // Simplistic ID generation
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.stores.push(newStore);
		return newStore;
	}

	public async update(id: string, data: StoreUpdateInput): Promise<IStore | null> {
		const storeIndex = this.stores.findIndex((store) => store.id === id);
		if (storeIndex === -1) {
			return null;
		}

		const exists = this.stores[storeIndex];

		if (!exists) {
			return null;
		}

		const updatedStore: IStore = {
			...exists,
			name: data.name || exists.name,
			updatedAt: new Date(),
		};
		this.stores[storeIndex] = updatedStore;
		return updatedStore;
	}

	public async delete(id: string): Promise<boolean> {
		const initialLength = this.stores.length;
		this.stores = this.stores.filter((store) => store.id !== id);
		return this.stores.length !== initialLength; // Return true if deleted
	}
}
