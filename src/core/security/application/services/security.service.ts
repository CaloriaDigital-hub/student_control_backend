// src/core/auth/application/services/security.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class SecurityService {
  constructor(private readonly prisma: PrismaService) { }

  async logSecurityEvent(
    userId: string | null,
    event: string,
    metadata: { ip?: string; userAgent?: string; email?: string; login?: string }
  ) {
    try {
      await this.prisma.securityLog.create({
        data: {
          userId,
          event,
          ipAddress: metadata.ip,
          userAgent: metadata.userAgent,
          
          timestamp: new Date(),
        },
      });
    } catch (error) {
      
      console.error('Failed to log security event:', error);
    }
  }

  async checkSuspiciousActivity(email: string, ip: string): Promise<boolean> {
    try {
      
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      const recentAttempts = await this.prisma.securityLog.count({
        where: {
          OR: [{ userId: email }, { ipAddress: ip }],
          event: { in: ['FAILED_LOGIN', 'SUCCESSFUL_LOGIN'] },
          timestamp: { gte: oneHourAgo },
        },
      });

      return recentAttempts > 10;
    } catch (error) {
      return false;
    }
  }


  async logFailedAttempt(login: string) {
    await this.logSecurityEvent(null, 'FAILED_LOGIN', login ? { login } : {});
  }
}