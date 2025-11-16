import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { SessionRepository } from '../../domain/repositories/session-repository.interface';
import { SessionEntity, SessionMetadata } from '../../domain/entities/session.entity';

interface PrismaSession {
  id: string;
  userId: string;
  refreshToken: string;
  isActive: boolean;
  createdAt: Date;
  expiresAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  device?: string | null;
  location?: string | null;
}

@Injectable()
export class SessionPrismaRepository implements SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(prismaSession: PrismaSession): SessionEntity {
    const metadata: SessionMetadata = {
      ipAddress: prismaSession.ipAddress || undefined,
      userAgent: prismaSession.userAgent || undefined,
      device: prismaSession.device || undefined,
      location: prismaSession.location || undefined
    };

    return new SessionEntity(
      prismaSession.id,
      
      prismaSession.userId,
      prismaSession.refreshToken,
      prismaSession.isActive,
      prismaSession.createdAt,
      prismaSession.expiresAt,
      metadata
    );
  }

  private toPersistence(session: SessionEntity): any {
    return {
      id: session.id,
      userId: session.userId,
      refreshToken: session.token,
      isActive: session.isActive,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      ipAddress: session.metadata.ipAddress,
      userAgent: session.metadata.userAgent,
      device: session.metadata.device,
      location: session.metadata.location
    };
  }

  async save(session: SessionEntity): Promise<SessionEntity> {
    const data = this.toPersistence(session);
    
    const saved = await this.prisma.session.upsert({
      where: { id: session.id },
      create: data,
      update: data
    });

    return this.toDomain(saved);
  }

  async findByToken(refreshToken: string): Promise<SessionEntity | null> {
    const session = await this.prisma.session.findFirst({
      where: { 
        refreshToken,
        isActive: true
      }
    });

    return session ? this.toDomain(session) : null;
  }

  async findByUserId(userId: string): Promise<SessionEntity[]> {
    const sessions = await this.prisma.session.findMany({
      where: { userId }
    });

    return sessions.map(session => this.toDomain(session));
  }

  async findActiveByUserId(userId: string): Promise<SessionEntity[]> {
    const sessions = await this.prisma.session.findMany({
      where: { 
        userId,
        isActive: true,
        expiresAt: { gt: new Date() }
      }
    });

    return sessions.map(session => this.toDomain(session));
  }

  async delete(refreshToken: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { refreshToken },
      data: { isActive: false }
    });
  }

  async deleteExpired(): Promise<number> {
    const result = await this.prisma.session.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    });

    return result.count;
  }

  async deleteAllForUser(userId: string): Promise<number> {
    const result = await this.prisma.session.updateMany({
      where: { userId },
      data: { isActive: false }
    });

    return result.count;
  }
}