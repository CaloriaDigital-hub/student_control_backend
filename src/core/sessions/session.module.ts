import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionsService } from './application/services/sessions.service';
import { SessionDomainService } from './domain/service/session.domain-service'
import { SessionPrismaRepository } from './infrastructure/repositories/session-prisma.repository';
import { SessionRepository } from './domain/repositories/session-repository.interface';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SessionConfig',
      useFactory: (configService: ConfigService) => ({
        ttlDays: configService.get('SESSION_TTL_DAYS', 7),
        maxSessionsPerUser: configService.get('MAX_SESSIONS_PER_USER', 5)
      }),
      inject: [ConfigService]
    },
    {
      provide: 'SessionRepository',
      useClass: SessionPrismaRepository
    },
    {
      provide: 'SessionDomainService',
      useFactory: (repo: SessionRepository, config: any) => 
        new SessionDomainService(repo, config),
      inject: ['SessionRepository', 'SessionConfig']
    },
    SessionsService
  ],
  exports: [
    SessionsService,
    'SessionRepository'
  ]
})
export class SessionModule {}