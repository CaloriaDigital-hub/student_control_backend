// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlAuthGuard } from './common/guards/gql-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  // Глобальный auth guard (кроме методов с @Public())
  app.useGlobalGuards(new GqlAuthGuard(reflector));
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(3000);
  console.log(`🚀 Application is running on: http://localhost:3000/graphql`);
}
bootstrap();