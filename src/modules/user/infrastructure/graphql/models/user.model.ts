// src/modules/user/infrastructure/graphql/models/user.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field({nullable: true})
  isActive: boolean;

  @Field({nullable: true})
  login: string;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}