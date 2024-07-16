import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { objectToSnake } from 'ts-case-convert';

@Injectable()
export class ResponseToSnake implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => objectToSnake(data)));
  }
}
