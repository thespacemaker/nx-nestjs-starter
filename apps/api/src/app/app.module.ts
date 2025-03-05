import { Module } from '@nestjs/common';

import { CoreModule } from '@nestjs-starter/api/modules/core';

import { DomainsModule } from '../domains/domains.module';

@Module({
	imports: [CoreModule, DomainsModule],
})
export class AppModule {}
