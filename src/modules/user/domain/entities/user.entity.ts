// src/modules/user/domain/entities/user.entity.ts
import { randomUUID } from "crypto";
import { CreateUserData } from "../repositories/user-repository.interface";
export class User {
  constructor(
    public id: string,
    public email: string,
    public login: string,
    public password: string,
    public createdAt: Date,
  ) {}

  static create(createData: CreateUserData): User {
    return new User(
      randomUUID(),
      createData.email,
      createData.login,
      createData.password,
      new Date(),
    );
  }
}