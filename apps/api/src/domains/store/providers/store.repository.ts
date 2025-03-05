import type {
	IStore,
	IStoreQuery,
	StoreCreateInput,
	StoreUpdateInput,
} from '../interfaces';

export abstract class AbstractStoreRepository {
	public abstract getById(id: string): Promise<IStore | null>;

	public abstract getAll(query: IStoreQuery): Promise<[IStore[], number]>;

	public abstract create(data: StoreCreateInput): Promise<IStore>;

	public abstract update(id: string, data: StoreUpdateInput): Promise<IStore | null>;

	public abstract delete(id: string): Promise<boolean>;
}
