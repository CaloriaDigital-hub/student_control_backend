// src/core/security/application/services/crypto.service.ts
import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class CryptoService {
  generateRandomString(length: number): string {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  generateHash(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }
}