import { Injectable } from '@nestjs/common';
import { SecurityLogRepository } from '../../infrastructure/repository/security-log.repository';
import { SecurityEvent } from '../../domain/event/security-event.enum';

@Injectable()
export class SecurityLogService {
  constructor(private readonly repo: SecurityLogRepository) {}

  loginSuccess(userId: string, ip?: string, ua?: string) {
    return this.repo.createLog({
      event: SecurityEvent.SUCCESSFUL_LOGIN,
      userId,
      timestamp: new Date(),
      ipAddress: ip,
      userAgent: ua,
    });
  }

  loginFailure(login: string, ip?: string, ua?: string) {
    return this.repo.createLog({
      event: SecurityEvent.FAILED_LOGIN,
      metadata: { login },
        timestamp: new Date(),
      ipAddress: ip,
      userAgent: ua,
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
