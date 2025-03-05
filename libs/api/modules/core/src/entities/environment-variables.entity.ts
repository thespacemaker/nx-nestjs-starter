import { IsIn, IsPort, IsString } from 'class-validator';

import type { EnvironmentType } from '@nestjs-starter/api/types';

export class EnvironmentVariables implements EnvironmentType {
	// basic config

	@IsString()
	@IsIn(['development', 'production'])
	NODE_ENV: 'development' | 'production' = 'development';

	@IsPort()
	PORT = '8080';

	// session related env

	@IsString()
	SECRET!: string;

	@IsString()
	SESSION_SECRET!: string;

	// swagger config

	@IsString()
	SWAGGER_USER!: string;

	@IsString()
	SWAGGER_PW!: string;

	// db

	@IsString()
	DATABASE_URL!: string;

	@IsString()
	POSTGRES_DB!: string;

	@IsString()
	POSTGRES_PASSWORD!: string;

	@IsString()
	POSTGRES_USER!: string;
}
