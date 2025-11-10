import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GraphQLExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = host.switchToHttp();
    const response = exception.getResponse() as any;

    const message =
      typeof response === 'string'
        ? response
        : response?.message || 'Произошла ошибка';

    const statusCode = exception.getStatus?.() || 500;

    this.logger.warn(`GraphQL Error (${statusCode}): ${message}`);

    // возвращаем упрощённый формат
    return {
      message,
      code:
        statusCode === 401
          ? 'UNAUTHORIZED'
          : statusCode === 404
          ? 'NOT_FOUND'
          : 'INTERNAL_ERROR',
    };
  }
}
