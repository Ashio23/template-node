import { HttpStatus } from '@nestjs/common';

export interface IError {
  code: string;
  response: IResponseError;
  config: IConfigError;
}
interface IResponseError {
  status: HttpStatus;
  data: { code: string; description: string };
}

interface IConfigError {
  url: string;
  method: string;
}
export interface IErrorValidation {
  property: string;
  constraint: Record<string, string>;
}
