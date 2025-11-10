// src/modules/user/domain/repositories/user-repository.interface.ts
import { SystemRole, UserRole } from '@prisma/client';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: CreateUserData): Promise<User>;
  abstract update(id: string, data: Partial<User>): Promise<User>;
  abstract getUserRoles(id: string): Promise<UserRole[]>;
  abstract getRoleNames(id: string): Promise<SystemRole[]>;
  abstract findByLogin(login: string): Promise<User | null>;
}

export interface CreateUserData {
  login: string;
  email: string;
  password: string;
}