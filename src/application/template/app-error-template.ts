export const FilesInternalErrors: InternalErrorsTemplate = {
  NOT_FOUND_FILE: { code: 'NF-F', description: 'Not found file' },
};
export interface InternalErrorTemplate {
  code: string | unknown | undefined;
  description: string | unknown | undefined;
}

export interface InternalErrorsTemplate {
  [key: string]: InternalErrorTemplate;
}
export interface ErrorTemplate {
  errorType: InternalErrorType;
  errorData: InternalErrorTemplate;
}
export enum InternalErrorType {
  NOT_FOUND_ENTITY = 'NOT_FOUND',
  INVALID_INPUT_DATA = 'INVALID_INPUT_DATA',
  BAD_GATEWAY = 'BAD_GATEWAY',
  BAD_REQUEST = 'BAD_REQUEST',
}
export class AppError extends Error implements ErrorTemplate {
  constructor(
    public readonly errorType: InternalErrorType,
    public readonly errorData: InternalErrorTemplate | any,
  ) {
    super(errorData.description);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
