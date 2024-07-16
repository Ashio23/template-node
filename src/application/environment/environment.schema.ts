import * as Joi from 'joi';

import { Environment } from './environment.type';

export const environmentSchema = Joi.object<Environment, true>({
  NODE_ENV: Joi.string().valid('local', 'dev', 'test', 'qa', 'prod').default('local'),
  PORT: Joi.number().default(3000),
  BACKEND_SERVICE_URL: Joi.string().uri().required(),
});
