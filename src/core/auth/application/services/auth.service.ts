// src/core/auth/application/services/auth-application.service.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserApplicationService } from 'src/modules/user/user.public';
import { PasswordService, JwtService } from 'src/core/security/security.public';
import { SecurityService } from 'src/core/security/security.public';
import { SessionsService } from 'src/core/sessions/session.public';


type LoginMetadata = {
  ip?: string;
  userAgent?: string;
  device?: string;
  [k: string]: any;
};

@Injectable()
export class AuthApplicationService {
  private readonly logger = new Logger(AuthApplicationService.name);

  constructor(
    private readonly userService: UserApplicationService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
    private readonly sessionsService: SessionsService,
  ) {}

  /**
   * Вход пользователя.
   * metadata — опционально, может содержать { ip, userAgent, device, ... }.
   */
  async login(
    login: string,
    password: string,
    metadata: LoginMetadata = {},
  ) {
    this.logger.debug(`AuthService.login called for ${login}`);

    
    const ip = metadata.ip ?? metadata.ipAddress ?? null;
    const ua = metadata.userAgent ?? metadata.ua ?? null;

    
    await this.securityService.validateLoginAttempt(login, ip);

    
    const user = await this.userService.findByLogin(login);

    if (!user) {
      
      await this.securityService.registerFailure(login, ip, ua);
      return {
        success: false,
        message: 'Неверный логин или пароль',
        accessToken: null,
        refreshToken: null,
        user: null,
      };
    }

    
    const isValid = await this.passwordService.comparePassword(password, user.password);

    if (!isValid) {
      
      await this.securityService.registerFailure(login, ip, ua);
      return {
        success: false,
        message: 'Неверный логин или пароль',
        accessToken: null,
        refreshToken: null,
        user: null,
      };
    }

    
    const accessToken = this.jwtService.generateAccessToken({
      sub: user.id,
      email: user.email,
      roles: await this.userService.getUserRoles(user.id),
    });

    const refreshToken = this.jwtService.generateRefreshToken({
      sub: user.id,
    });

    
    try {
      await this.sessionsService.create(user.id, refreshToken, {
        ipAddress: ip,
        userAgent: ua,
        
      });
    } catch (err) {
      
      this.logger.error('Failed to persist session', err as any);
      
    }

    
    await this.securityService.registerSuccess(user.id, login, ip, ua);

    
    return {
      success: true,
      message: 'Вход выполнен успешно',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        roles: await this.userService.getUserRoles(user.id),
      },
    };
  }

}
