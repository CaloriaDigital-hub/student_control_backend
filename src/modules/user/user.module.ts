// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma.repository';
import { UserRepository } from './domain/repositories/user-repository.interface';
import { UserResolver } from './infrastructure/resolvers/user.resolver';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    UserResolver,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}