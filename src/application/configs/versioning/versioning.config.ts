import { INestApplication, VersioningType } from '@nestjs/common';

export const enableVersioning = (app: INestApplication) => {
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
};
