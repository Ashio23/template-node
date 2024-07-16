import { setSwagger } from '@application/configs/swagger';
import { EnvironmentService } from '@application/environment';
import { setGlobalInterceptors } from '@application/interceptors';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Express } from 'express';

import { AppModule } from './app.module';
import { enableVersioning, packageJson, setGlobalPrefix } from './application';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  setGlobalPrefix(app);
  enableVersioning(app);
  setGlobalInterceptors(app);
  setSwagger(app, packageJson);

  app.useGlobalPipes(new ValidationPipe());
  setSwagger(app, packageJson);

  const express = app.getHttpAdapter().getInstance() as Express;
  express.set('etag', false);

  const environmentService = app.get(EnvironmentService);

  const port = environmentService.get('PORT');

  await app.listen(port, () => {
    Logger.log(`${packageJson.name} is running on port ${port}`);
    Logger.log(`Please remember read README file and delete this line (./src/main.ts:line 30-32)`);
  });
}

bootstrap();
