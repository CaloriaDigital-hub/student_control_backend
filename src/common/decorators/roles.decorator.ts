// src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { SystemRole } from '../enum/role.enum';

export const ROLES_KEY = process.env.ROLES_KEY;
export const Roles = (...roles: SystemRole[]) => SetMetadata(ROLES_KEY, roles);