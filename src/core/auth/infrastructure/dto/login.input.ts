// src/core/auth/infrastructure/dto/login.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  login: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}