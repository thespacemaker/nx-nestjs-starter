import { Injectable } from '@nestjs/common';

import { PrismaService } from '@nestjs-starter/api/modules/global';
import { Prisma, Store } from '@nestjs-starter/prisma';
import { OrderDirection } from '@nestjs-starter/api/modules/core';

import { AbstractStoreRepository } from './store.repository';
import { IStore, IStoreQuery, StoreCreateInput, StoreUpdateInput } from '../interfaces';

@Injectable()
export class PrismaStoreRepository extends AbstractStoreRepository {
	constructor(private readonly prisma: PrismaService) {
		super();
	}

	public async getById(id: string): Promise<IStore | null> {
		const store = await this.prisma.store.findUnique({
			where: {
				id: id,
			},
		});

		if (!store) {
			return null;
		}

		return this.mapToDomain(store);
	}

	public async getAll({
		ids = [],
		search = '',
		skip = 0,
		take = 30,
		orderDirection = OrderDirection.asc,
		orderBy,
	}: IStoreQuery): Promise<[IStore[], number]> {
		const where: Prisma.StoreWhereInput = {};

		if (search) {
			where.name = { contains: search };
		}

		if (ids.length > 0) {
			where.id = { in: ids };
		}

		const [stores, count] = await Promise.all([
			this.prisma.store.findMany({
				where,
				orderBy: orderBy && {
					[orderBy]: orderDirection,
				},
				skip,
				take,
			}),
			this.prisma.store.count({
				where,
			}),
		]);
		return [stores.map(this.mapToDomain), count];
	}

	public async create(data: StoreCreateInput): Promise<IStore> {
		const store = await this.prisma.store.create({
			data: data,
		});
		return this.mapToDomain(store);
	}

	public async update(id: string, data: StoreUpdateInput): Promise<IStore | null> {
		try {
			const store = await this.prisma.store.update({
				where: {
					id: id,
				},
				data: data,
			});
			return this.mapToDomain(store);
		} catch (error) {
			return null;
		}
	}

	public async delete(id: string): Promise<boolean> {
		try {
			await this.prisma.store.delete({
				where: {
					id: id,
				},
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	private mapToDomain(store: Store): IStore {
		return {
			id: store.id,
			name: store.name,
			createdAt: store.createdAt,
			updatedAt: store.updatedAt,
		};
	}
}
