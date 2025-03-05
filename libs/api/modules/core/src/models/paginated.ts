import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';

export interface IPaginatedType<T = unknown> {
	data: T[];
	total: number;
}

export const Paginated = <T = unknown>(classRef: Type<T>): Type<IPaginatedType<T>> => {
	class PaginatedType implements IPaginatedType<T> {
		@ApiProperty({ type: [classRef] })
		@IsArray()
		data: T[];

		@ApiProperty({ type: Number })
		@IsInt()
		total: number;

		constructor(properties: IPaginatedType<T>) {
			this.data = properties.data;
			this.total = properties.total;
		}
	}

	return PaginatedType as Type<IPaginatedType<T>>;
};
