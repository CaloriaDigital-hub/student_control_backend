import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class SecurityLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(data: {
    userId?: string | null;
    event: string;
    ipAddress?: string;
    timestamp: Date;
    userAgent?: string;
    metadata?: any;
  }) {
    return this.prisma.securityLog.create({
      data: {
        ...data,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null
      }
    });
  }
}
