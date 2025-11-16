// src/modules/user/infrastructure/repositories/user-prisma.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UserRepository, CreateUserData } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { SystemRole, UserRole } from '@prisma/client';

@Injectable()
export class UserPrismaRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.toDomain(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.toDomain(user) : null;
  }

  async create(createData: CreateUserData): Promise<User> {
    const user = await this.prisma.user.create({
      data: createData,
    });
    return this.toDomain(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.toDomain(user);
  }


  
  async getUserRoles(id: string): Promise<UserRole[]> {
    return this.prisma.userRole.findMany({ where: { userId: id } });
  }


  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { login },
    });
    return user ? this.toDomain(user) : null;
  }

  async getRoleNames(id: string): Promise<SystemRole[]> {
    const roles = await this.prisma.userRole.findMany({
      where: { userId: id, isActive: true },
      select: { role: true },
    });
    return roles.map(r => r.role);
  }
  private toDomain(prismaUser: any): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.login,
      prismaUser.password,
      prismaUser.createdAt,
    );
  }
}