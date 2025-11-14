import { Injectable } from '@nestjs/common';
import { SecurityLogRepository } from '../../infrastructure/security-log.repository';
import { SecurityEvent } from '../../domain/security-event.enum';

@Injectable()
export class SecurityLogService {
  constructor(private repo: SecurityLogRepository) {}

  loginSuccess(userId: string, ip?: string, ua?: string) {
    return this.repo.createLog({
      event: SecurityEvent.SUCCESSFUL_LOGIN,
      userId,
      ipAddress: ip,
      userAgent: ua,
      timestamp: new Date(),
    });
  }

       timestamp: Date;

  loginFailure(login: string, ip?: string, ua?: string) {
    return this.repo.createLog({
      event: SecurityEvent.FAILED_LOGIN,
      metadata: login,
      userId: null,
      ipAddress: ip,
      userAgent: ua,
      timestamp: new Date(),
    });
  }

  logout(userId: string, ip?: string, ua?: string) {
    return this.repo.createLog({
      event: SecurityEvent.LOGOUT,
      userId,
      timestamp: new Date(),
      ipAddress: ip,
      userAgent: ua,
    });
  }
}
