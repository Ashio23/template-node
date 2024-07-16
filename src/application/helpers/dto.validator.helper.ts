import { HttpException, HttpStatus } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export async function validateDto<T extends object, V>(
  cls: ClassConstructor<T>,
  data: V,
): Promise<unknown> {
  const dto = plainToInstance(cls, data, {
    excludeExtraneousValues: true,
  });
  try {
    await validateOrReject(dto);
  } catch (error) {
    throw new HttpException({ message: error }, HttpStatus.BAD_REQUEST);
  }

  return dto;
}
