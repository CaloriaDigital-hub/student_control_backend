// src/core/auth/infrastructure/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserApplicationService } from 'src/modules/user/application/services/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserApplicationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    // payload содержит { email: string, sub: string (userId) }
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Возвращаемый объект добавляется в request.user
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}