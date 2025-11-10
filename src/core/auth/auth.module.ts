// src/core/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './application/services/auth.service';

import { AuthResolver } from './infrastructure/resolvers/auth.resolver';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { SecurityModule } from '../security/security.module';
import { SecurityService } from '../security/security.public';

@Module({
  imports: [
    UserModule,
    PassportModule,
    SecurityModule
    // УБИРАЕМ JwtModule - он теперь в SecurityModule
  ],
  providers: [
    AuthService,  
    AuthResolver,
    SecurityService,
    JwtStrategy,
  ],
  exports: [AuthService], // Только AuthService для внешнего использования
})
export class AuthModule {}