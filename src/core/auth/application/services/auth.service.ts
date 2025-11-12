import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.public';
import { PasswordService, JwtService } from 'src/core/security/security.public';
import { SecurityService } from '../../../security/security.public';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class AuthApplicationService {
  private readonly logger = new Logger(AuthApplicationService.name);

  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
  ) { }

  async login(login: string, password: string, metadata?: Record<string, any>) {
    this.logger.debug(`💡 AuthService.login called for ${login}`);

    const user = await this.userService.findByLogin(login);

    if (!user) {
      
      await this.securityService.logSecurityEvent(user, 'FAILED_LOGIN', metadata || {});
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
      
      await this.securityService.logSecurityEvent(user.id, 'FAILED_LOGIN', metadata || {});
      return {
        success: false,
        message: 'Неверный логин или пароль',
        accessToken: null,
        refreshToken: null,
        user: null,
      };
    }

    // всё ок
    await this.securityService.logSecurityEvent(user.id, 'SUCCESSFUL_LOGIN', metadata || {});

    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
    const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });

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
