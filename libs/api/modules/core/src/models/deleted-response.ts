import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class DeletedResponse {
	@ApiProperty({ type: Boolean, description: 'Status on delete operation.' })
	@IsBoolean()
	status = true;
}
