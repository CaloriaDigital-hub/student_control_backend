// src/core/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { AuthApplicationService } from './application/services/auth.service';

import { AuthResolver } from './infrastructure/resolvers/auth.resolver';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { SecurityModule } from '../security/security.module';
import { SecurityService } from '../security/security.public';

@Module({
  imports: [
    UserModule,
    PassportModule,
    SecurityModule
    
  ],
  providers: [
    AuthApplicationService,  
    AuthResolver,
    SecurityService,
    JwtStrategy,
  ],
  exports: [AuthApplicationService],
})
export class AuthModule {}