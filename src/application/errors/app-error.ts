import { HttpException, HttpStatus } from '@nestjs/common';

import { InternalErrorTemplate } from '../template';

export class AppError extends HttpException {
  constructor(
    public readonly errorStatus: HttpStatus,
    public readonly errorData: InternalErrorTemplate | any,
  ) {
    super(errorData, errorStatus);
  }
}
