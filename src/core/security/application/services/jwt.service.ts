import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  generateAccessToken(payload: any): string {
    return this.nestJwtService.sign(payload, {
      expiresIn: '15m'
    });
  }

  generateRefreshToken(payload: any): string {
    return this.nestJwtService.sign(payload, {
      expiresIn: '7d'
    });
  }

  verifyAccessToken<T = any>(token: string): T {
    try {
      return this.nestJwtService.verify(token) as unknown as T;
    } catch {
      throw new UnauthorizedException('Недействительный токен доступа');
    }
  }

  verifyRefreshToken<T = any>(token: string): T {
    try {
      return this.nestJwtService.verify(token) as unknown as T;
    } catch {
      throw new UnauthorizedException('Недействительный refresh token');
    }
  }

  decode(token: string) {
    return this.nestJwtService.decode(token);
  }
}
