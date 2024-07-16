type JSendStatus = 'success' | 'fail' | 'error';

export interface JSendResponse<T> {
  status: JSendStatus;
  data?: T;
  message?: string;
}

export class JSend {
  static success<T>(data: T): JSendResponse<T> {
    return {
      status: 'success',
      data: data,
    };
  }

  static fail<T>(data: T): JSendResponse<T> {
    return {
      status: 'fail',
      data: data,
    };
  }

  static error<T>(message: string): JSendResponse<T> {
    return {
      status: 'error',
      message: message,
    };
  }
}
