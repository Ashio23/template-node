import { ErrorHandler } from './error-handler';
import { LoggingInterceptor } from './logging';
import { ResponseToSnake } from './response-to-snake';

export const setGlobalInterceptors = (app) => {
  app.useGlobalInterceptors(new ResponseToSnake(), new LoggingInterceptor(), new ErrorHandler());
};
