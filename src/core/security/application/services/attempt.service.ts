import { Injectable } from '@nestjs/common';
import { LoginAttemptRepository } from '../../infrastructure/repository/login-attempt.repository';

@Injectable()
export class AttemptService {
  constructor(private readonly repo: LoginAttemptRepository) {}

  async increase(login: string, ip?: string) {
    return this.repo.increase(login, ip ?? 'unknown');
  }

  async reset(login: string, ip?: string) {
    return this.repo.reset(login, ip ?? 'unknown');
  }

  async isLocked(login: string, ip?: string) {
    const attempt = await this.repo.find(login, ip ?? 'unknown');
    if (!attempt) return false;

    const tooMany = attempt.attempts >= 5;
    if (!tooMany) return false;

    const lockMs = 10 * 60 * 1000; // 10 мин
    const unlockTime = new Date(attempt.lastAttempt.getTime() + lockMs);

    return unlockTime > new Date();
  }
}
