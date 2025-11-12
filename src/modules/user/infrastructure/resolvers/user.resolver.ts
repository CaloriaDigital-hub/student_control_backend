// src/modules/user/infrastructure/resolvers/user.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserApplicationService } from '../../application/services/user.service';
import { UserModel } from '../graphql/models/user.model';
import { CreateUserInput } from '../graphql/dto/create-user.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';

import { User } from '../../domain/entities/user.entity';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserApplicationService) {}

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async user(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }
}