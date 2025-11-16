import { Injectable, Inject } from '@nestjs/common';
import { SessionRepository } from '../repositories/session-repository.interface';
import { SessionEntity, SessionMetadata } from '../entities/session.entity';
import {
  SessionNotFoundError,
  SessionExpiredError,
  SessionInactiveError
} from '../exceptions/session.exceptions';

export interface SessionConfig {
  ttlDays: number;
  maxSessionsPerUser?: number;
}

@Injectable()
export class SessionDomainService {
  constructor(
    @Inject('SessionRepository')
    private readonly repo: SessionRepository,
    private readonly config: SessionConfig = { ttlDays: 7 }
  ) {}

  async createSession(
    userId: string,
    refreshToken: string,
    metadata: SessionMetadata = {}
  ): Promise<SessionEntity> {
    // Проверяем лимит сессий
    if (this.config.maxSessionsPerUser) {
      await this.enforceSessionLimit(userId);
    }

    const session = SessionEntity.create(
      userId,
      refreshToken,
      this.config.ttlDays,
      metadata
    );

    return this.repo.save(session);
  }

  async validateSession(refreshToken: string): Promise<SessionEntity> {
    const session = await this.repo.findByToken(refreshToken);
    
    if (!session) {
      throw new SessionNotFoundError();
    }

    session.validate();
    return session;
  }

  async rotateSession(
    oldToken: string,
    newToken: string
  ): Promise<SessionEntity> {
    const session = await this.validateSession(oldToken);
    session.rotateToken(newToken, this.config.ttlDays);
    
    return this.repo.save(session);
  }

  async refreshSession(refreshToken: string): Promise<SessionEntity> {
    const session = await this.validateSession(refreshToken);
    session.extend(this.config.ttlDays);
    
    return this.repo.save(session);
  }

  async destroySession(refreshToken: string): Promise<void> {
    const session = await this.repo.findByToken(refreshToken);
    
    if (session) {
      session.deactivate();
      await this.repo.save(session);
    }
  }

  async destroyAllUserSessions(userId: string): Promise<number> {
    return this.repo.deleteAllForUser(userId);
  }

  async getUserSessions(userId: string): Promise<SessionEntity[]> {
    return this.repo.findActiveByUserId(userId);
  }

  async cleanupExpiredSessions(): Promise<number> {
    return this.repo.deleteExpired();
  }

  private async enforceSessionLimit(userId: string): Promise<void> {
    const activeSessions = await this.repo.findActiveByUserId(userId);
    
    if (activeSessions.length >= this.config.maxSessionsPerUser!) {
      // Удаляем самую старую сессию
      const oldestSession = activeSessions
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];
      
      await this.destroySession(oldestSession.token);
    }
  }
}