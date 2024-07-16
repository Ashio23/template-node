import { Injectable, NestMiddleware } from '@nestjs/common';
import compression from 'compression';
import { json, urlencoded } from 'express';
import { middleware } from 'express-http-context';
import helmet from 'helmet';

@Injectable()
export class HttpContextMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    middleware(req, res, next);
  }
}

export default (app: any, packageJson: any) => {
  const modifyUserAgent = (request: any, _response: any, next: any) => {
    request.headers['user-agent'] = `${packageJson.name} / ${packageJson.version}`;
    next();
  };

  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.use(json({ limit: '10mb' }));
  app.use(modifyUserAgent);
  app.use(urlencoded({ limit: '10mb', extended: true }));
};
