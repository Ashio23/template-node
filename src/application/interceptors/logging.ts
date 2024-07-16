import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controllerName = context.getClass().name;
    const httpMethod = context.switchToHttp().getRequest().method;
    const route = context.switchToHttp().getRequest().url;
    const body = context.switchToHttp().getRequest().body;
    const request = context.switchToHttp().getRequest();
    const ip = request.connection.remoteAddress;
    const userAgent = context.switchToHttp().getRequest().userAgent;
    const response = context.switchToHttp().getResponse().statusCode;
    const userId = context.switchToHttp().getRequest().headers.originalUserId;

    const logRequest = {
      userId,
      controllerName,
      httpMethod,
      route,
      body: body,
      ip,
      userAgent,
    };

    this.logger.log(
      `Call from UserId: [${userId}] | [${controllerName}] ${httpMethod} ${route} ${JSON.stringify(
        logRequest.body,
      )} From IP: ${ip} ${userAgent}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        const logResponse = {
          controllerName,
          httpMethod,
          route,
          response,
          body: data,
          ip,
        };

        this.logger.debug(
          `Response to UserId: [${userId}] | [${controllerName}] ${httpMethod} ${route} ${response} ${JSON.stringify(
            logResponse.body,
          )} From IP: ${ip} ${userAgent} called in: ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
