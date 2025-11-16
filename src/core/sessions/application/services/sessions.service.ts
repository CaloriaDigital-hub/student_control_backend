import { Injectable, Inject } from '@nestjs/common';
import { SessionDomainService } from 'src/core/sessions/domain/service/session.domain-service';
import { SessionEntity, SessionMetadata } from 'src/core/sessions/domain/entities/session.entity';
import {
  SessionNotFoundError,
  SessionExpiredError,
  SessionInactiveError
} from 'src/core/sessions/domain/exceptions/session.exceptions';

@Injectable()
export class SessionsService {
  constructor(
    @Inject('SessionDomainService')
    private readonly domain: SessionDomainService
  ) {}

  async create(
    userId: string, 
    refreshToken: string, 
    metadata?: SessionMetadata
  ): Promise<SessionEntity> {
    return this.domain.createSession(userId, refreshToken, metadata);
  }

  async validate(refreshToken: string): Promise<SessionEntity> {
    return this.domain.validateSession(refreshToken);
  }

  async rotate(oldToken: string, newToken: string): Promise<SessionEntity> {
    return this.domain.rotateSession(oldToken, newToken);
  }

  async refresh(refreshToken: string): Promise<SessionEntity> {
    return this.domain.refreshSession(refreshToken);
  }

  async terminate(refreshToken: string): Promise<void> {
    return this.domain.destroySession(refreshToken);
  }

  async terminateAllForUser(userId: string): Promise<number> {
    return this.domain.destroyAllUserSessions(userId);
  }

  async getUserSessions(userId: string): Promise<SessionEntity[]> {
    return this.domain.getUserSessions(userId);
  }

  async cleanup(): Promise<number> {
    return this.domain.cleanupExpiredSessions();
  }
}