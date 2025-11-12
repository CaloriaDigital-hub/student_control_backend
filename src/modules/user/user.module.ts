// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserApplicationService } from './user.public';
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma.repository';
import { UserRepository } from './domain/repositories/user-repository.interface';
import { UserResolver } from './infrastructure/resolvers/user.resolver';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserApplicationService,
    UserResolver,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UserApplicationService, UserRepository],
})
export class UserModule {}