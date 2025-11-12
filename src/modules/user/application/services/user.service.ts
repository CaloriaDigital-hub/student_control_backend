// src/modules/user/application/services/user.service.ts
import { Injectable, Query } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { SystemRole, UserRole } from '@prisma/client';

@Injectable()
export class UserApplicationService {
  constructor(private readonly userRepository: UserRepository) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(createData: { login: string; email: string; password: string }): Promise<User> {
    return this.userRepository.create(createData);
  }

  async updatePassword(id: string, newPassword: string): Promise<User> {
    return this.userRepository.update(id, { password: newPassword });
  }



  async getUserRoles(id: string): Promise<SystemRole[]> {
    const roles = await this.userRepository.getRoleNames(id);

    return roles;
  }


  async findByLogin(login: string): Promise<User | null> {
    return this.userRepository.findByLogin(login);
  }
}