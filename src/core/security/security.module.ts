// src/core/security/security.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from './application/services/password.service';
import { JwtService } from './application/services/jwt.service';
import { CryptoService } from './application/services/crypto.service';
import { LoginAttemptRepository } from './infrastructure/repository/login-attempt.repository';
import { AttemptService } from './application/services/attempt.service';
import { SecurityService } from './application/services/security.service';
import { SecurityLogService } from './application/services/security-log.service';
import { SecurityLogRepository } from './infrastructure/repository/security-log.repository';
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
  providers: [SecurityService,
    SecurityLogService,
    AttemptService,
    SecurityLogRepository,
    LoginAttemptRepository, PasswordService, JwtService, CryptoService],
  exports: [SecurityService,
    SecurityLogService,
    AttemptService,
    PasswordService, JwtService, CryptoService],
})
export class SecurityModule { }