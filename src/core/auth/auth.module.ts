// src/core/auth/auth.module.ts
import { Module, Session } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { SessionModule } from 'src/core/sessions/session.module';
import { AuthApplicationService } from './application/services/auth.service';

import { AuthResolver } from './infrastructure/resolvers/auth.resolver';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { SecurityModule } from '../security/security.module';
import { SecurityService } from '../security/security.public';

@Module({
  imports: [
    UserModule,
    PassportModule,
    SecurityModule,
    SessionModule
    
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