import { InternalErrorType } from '@application/template';
import {
  BadGatewayException,
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorHandler implements NestInterceptor {
  private readonly logger = new Logger(ErrorHandler.name);

  private printErrorInConsole(error) {
    this.logger.log(
      `Info: ${JSON.stringify(error)}
      Stack Trace: ${error.stack}`,
    );
    if (error.response && error.response.data) {
      console.table(error.response.data);
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.printErrorInConsole(error);

        if (error.errorType && error.errorType === InternalErrorType.NOT_FOUND_ENTITY) {
          throw new NotFoundException({ error });
        }
        if (error.status && error.status === HttpStatusCode.NotFound) {
          throw new NotFoundException('agreement not found');
        }
        if (error.status && error.status === HttpStatusCode.BadRequest) {
          throw new NotFoundException('incorrect parameters');
        }

        if (error.errorType === InternalErrorType.BAD_REQUEST) {
          throw new BadRequestException({ error });
        }

        if (error.errorType === InternalErrorType.NOT_FOUND_ENTITY) {
          throw new NotFoundException({ error });
        }

        if (error.errorType && error.errorType === InternalErrorType.INVALID_INPUT_DATA) {
          throw new BadRequestException({ error });
        }

        if (error.errorType && error.errorType === InternalErrorType.BAD_GATEWAY) {
          throw new BadGatewayException({ error });
        }

        if (error.response && error.response.error === 'Bad Request') {
          throw new BadRequestException({ error });
        }

        //Provider errors
        if (error.response && error.response.status === HttpStatusCode.BadRequest) {
          throw new BadRequestException({ error });
        }

        throw new InternalServerErrorException();
      }),
    );
  }
}
