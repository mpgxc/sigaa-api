import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CreateSession } from 'application/use-cases/create-session';
import * as redisStore from 'cache-manager-redis-store';
import { SIGAA_URLS } from 'commons/constants';
import type { RedisOptions } from 'ioredis';

import { PrismaService } from './database/prisma.service';
import { SessionController } from './http/controllers/session.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<RedisOptions>({
      max: 10, // 10 items
      ttl: 5 * 60, // 5 minutes
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
    HttpModule.register({
      baseURL: SIGAA_URLS.BASE,
    }),
  ],
  providers: [PrismaService, CreateSession],
  exports: [PrismaService],
  controllers: [SessionController],
})
export class InfraModule {}
