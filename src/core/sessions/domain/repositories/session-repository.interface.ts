import { SessionEntity } from '../entities/session.entity';

export interface SessionRepository {
  save(session: SessionEntity): Promise<SessionEntity>;
  findByToken(refreshToken: string): Promise<SessionEntity | null>;
  findByUserId(userId: string): Promise<SessionEntity[]>;
  findActiveByUserId(userId: string): Promise<SessionEntity[]>;
  delete(refreshToken: string): Promise<void>;
  deleteExpired(): Promise<number>;
  deleteAllForUser(userId: string): Promise<number>;
}