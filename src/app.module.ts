// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { GraphQLExceptionFilter } from './common/filter/graphql-exception.filter';
import { join } from 'path';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true
      },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],

  providers: [{
    provide: 'APP_FILTER',
    useClass: GraphQLExceptionFilter,
  }]
})
export class AppModule { }
