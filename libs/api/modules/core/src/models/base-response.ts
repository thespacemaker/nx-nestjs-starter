import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import { Type as ClassTransformerType } from 'class-transformer';

import type { Any, ICommonResponseInterface } from '@nestjs-starter/shared/types';

type Constructable<T, P> = new (properties: P) => T;

export const BaseResponse = <T = Any>(
	dataType: Type<T>,
): Constructable<ICommonResponseInterface<T>, ICommonResponseInterface<T>> => {
	class CommonResponse implements ICommonResponseInterface<T> {
		@ApiProperty({ enum: HttpStatus, description: 'HTTP Status Code' })
		@IsEnum(HttpStatus)
		status: HttpStatus = HttpStatus.OK;

		@ApiProperty({ type: String, description: 'Response Message' })
		@IsString()
		message = '';

		@ApiProperty({
			type: dataType,
			description: 'Response Data',
			nullable: true,
		})
		@ValidateNested()
		@ClassTransformerType(() => dataType)
		data: T | null = null;

		constructor(properties: CommonResponse) {
			this.status = properties.status;
			this.message = properties.message;
			this.data = properties.data;
		}
	}

	return CommonResponse as Constructable<
		ICommonResponseInterface<T>,
		ICommonResponseInterface<T>
	>;
};
