// src/core/security/security.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from './application/services/password.service';
import { JwtService } from './application/services/jwt.service';
import { CryptoService } from './application/services/crypto.service';

@Global() // Делаем глобальным, чтобы не импортировать в каждый модуль
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: '15m',
        issuer: 'student-control-api',
      },
    }),
  ],
  providers: [PasswordService, JwtService, CryptoService],
  exports: [PasswordService, JwtService, CryptoService],
})
export class SecurityModule {}