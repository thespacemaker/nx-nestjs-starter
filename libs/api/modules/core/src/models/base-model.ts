import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class BaseModel {
	@ApiProperty({
		description: 'uniq resource id',
		example: 'bd572f20-4013-48f7-bb7d-2c50c5ddc973',
	})
	@IsNotEmpty()
	@IsUUID()
	id: string = v4();

	@ApiProperty({
		description: 'Date create action',
		example: '2022-01-08 17:07:46.654Z',
	})
	@IsDate()
	@IsNotEmpty()
	createdAt: Date = new Date();

	@ApiProperty({
		description: 'Date last update',
		example: '2022-01-08 17:07:46.654Z',
	})
	@IsDate()
	@IsNotEmpty()
	updatedAt: Date = new Date();
}
