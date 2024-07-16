import { AppError } from '@application/errors';
import { HttpStatus, Logger, ValidationError } from '@nestjs/common';
import { toSnake } from 'ts-case-convert';

export const formatValidationErrors = (validationErrors: ValidationError[]) => {
  Logger.log(`[VALIDATION_ERROR]: ${validationErrors}`);
  const payloadErrors = validationErrors.map((error: ValidationError) => ({
    code: toSnake(error.property),
    description: Object.values(error.value)[0],
  }));

  return new AppError(HttpStatus.BAD_REQUEST, payloadErrors[0]);
};
