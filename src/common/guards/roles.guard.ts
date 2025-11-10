// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SystemRole } from '../enum/role.enum';
import { UserService } from 'src/modules/user/application/services/user.service';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<SystemRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      return false;
    }


    const userRoles = await this.userService.getUserRoles(user.id);
    
    return requiredRoles.some(role => userRoles.includes(role));
  }


 
}