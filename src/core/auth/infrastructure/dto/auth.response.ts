// src/core/auth/infrastructure/dto/auth.response.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  
   @Field(() => String, { nullable: true })
  accessToken?: string | null;

  @Field(() => String, { nullable: true })
  refreshToken?: string | null;




  

  @Field(() => Boolean, { nullable: true })
  success?: boolean;

  @Field(() => String)
  message: string;

}
