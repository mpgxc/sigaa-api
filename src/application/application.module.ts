import { Module } from '@nestjs/common';

import { PrismaService } from 'infra/database/prisma.service';

import {} from './use-cases/create-session';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [],
})
export class ApplicationModule {}
