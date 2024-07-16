import { GLOBAL_PREFIX } from '@application/constants';
import { INestApplication } from '@nestjs/common';

export function setGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix(GLOBAL_PREFIX);
}
