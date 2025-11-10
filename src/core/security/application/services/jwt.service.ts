// src/core/security/application/services/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  sign(payload: any, options?: any): string {
    return this.nestJwtService.sign(payload, options);
  }

  verifyToken<T = any>(token: string): T {
    return this.nestJwtService.verify(token) as T;
  }

  decodeToken(token: string): any {
    return this.nestJwtService.decode(token);
  }
}