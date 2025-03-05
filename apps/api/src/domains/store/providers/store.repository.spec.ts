import { Test } from '@nestjs/testing';

import { AbstractStoreRepository } from './store.repository';
import { MockStoreRepository } from './store.repository-adapter.mock';

import type { TestingModule } from '@nestjs/testing';
import type { IStore, StoreCreateInput, StoreUpdateInput } from '../interfaces';

describe('MockStoreRepository', () => {
	let repository: AbstractStoreRepository;
	let store1: IStore;
	let store2: IStore;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: AbstractStoreRepository,
					useClass: MockStoreRepository, // Use the mock implementation
				},
			],
		}).compile();

		repository = module.get<AbstractStoreRepository>(AbstractStoreRepository);
		const mockRepo = repository as MockStoreRepository;

		store1 = await mockRepo.create({ name: 'Store 1' });
		store2 = await mockRepo.create({ name: 'Store 2' });
	});

	afterEach(() => {
		// Reset the mock data after each test. This is crucial to prevent tests
		// from interfering with each other.
		const mockRepo = repository as MockStoreRepository; // Cast to access private methods
		mockRepo['stores'] = []; // Reset the stores array
	});

	it('should be defined', () => {
		expect(repository).toBeDefined();
	});

	it('should get a store by ID', async () => {
		const store = await repository.getById(store1.id);
		expect(store).toEqual(store1);
	});

	it('should return null if store ID is not found', async () => {
		const store = await repository.getById('nonexistent-id');
		expect(store).toBeNull();
	});

	it('should get all stores', async () => {
		const [stores, count] = await repository.getAll({}); // Empty query
		expect(stores).toEqual([store1, store2]);
		expect(count).toBe(2);
	});

	it('should get all stores, with query parameters', async () => {
		const [stores, count] = await repository.getAll({
			search: 'Store 1',
			skip: 0,
			take: 10,
		});
		expect(stores).toEqual([store1]);
		expect(count).toBe(1);
	});

	it('should create a store', async () => {
		const createData: StoreCreateInput = { name: 'New Store' };
		const store = await repository.create(createData);

		expect(store).toEqual(expect.objectContaining(createData));
		expect(store.id).toBeDefined(); // Ensure ID is generated
	});

	it('should update a store', async () => {
		const updateData: StoreUpdateInput = { name: 'Updated Store' };
		const updatedStore = await repository.update(store1.id, updateData);

		expect(updatedStore).toEqual(
			expect.objectContaining({
				...store1,
				...updateData,
				updatedAt: updatedStore?.updatedAt,
			}),
		);
	});

	it('should return null when updating a store that does not exist', async () => {
		const updateData: StoreUpdateInput = { name: 'Updated Store' };
		const updatedStore = await repository.update('nonexistent-id', updateData);
		expect(updatedStore).toBeNull();
	});

	it('should delete a store', async () => {
		const deleted = await repository.delete(store1.id);
		expect(deleted).toBe(true);
		const store = await repository.getById(store1.id);
		expect(store).toBeNull(); // Confirm store is deleted
	});

	it('should return false when deleting a store that does not exist', async () => {
		const deleted = await repository.delete('nonexistent-id');
		expect(deleted).toBe(false);
	});
});
