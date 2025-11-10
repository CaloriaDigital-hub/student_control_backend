// src/core/auth/infrastructure/resolvers/auth.resolver.ts
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../../application/services/auth.service';
import { LoginInput } from '../dto/login.input';
import { AuthResponse } from '../dto/auth.response';
import { Public } from 'src/common/decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => String)
  @Public()
  healthCheck(): string {
    return 'API is running!';
  }

  @Mutation(() => AuthResponse)
  @Public()
  async login(@Args('input') input: LoginInput, @Context() context: any) {
    const req = context.req;
    const metadata = {
      ip: this.getClientIp(req),
      userAgent: req.headers['user-agent'],
    };
    return this.authService.login(input.login, input.password, metadata);
  }



  private getClientIp(req: any): string {
    return req.ip ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.connection?.socket?.remoteAddress ||
      'unknown';
  }
}