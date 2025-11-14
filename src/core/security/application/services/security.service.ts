import { Injectable, ForbiddenException } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { SecurityLogService } from './security-log.service';

@Injectable()
export class SecurityService {
  constructor(
    private readonly attempts: AttemptService,
    private readonly logs: SecurityLogService,
  ) {}

  async validateLoginAttempt(login: string, ip?: string) {
    const locked = await this.attempts.isLocked(login, ip);
    if (locked) {
      await this.logs.loginFailure(login, ip);
      throw new ForbiddenException('Слишком много попыток входа. Попробуйте позже.');
    }
  }

  async registerFailure(login: string, ip?: string, ua?: string) {
    await this.attempts.increase(login, ip);
    await this.logs.loginFailure(login, ip, ua);
  }

  async registerSuccess(userId: string, login: string, ip?: string, ua?: string) {
    await this.attempts.reset(login, ip);
    await this.logs.loginSuccess(userId, ip, ua);
  }

  async registerLogout(userId: string, ip?: string, ua?: string) {
    await this.logs.logout(userId, ip, ua);
  }
}
