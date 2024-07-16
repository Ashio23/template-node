import { formatValidationErrors } from '@application/helpers';
import { createParamDecorator, ExecutionContext, Logger, ValidationError } from '@nestjs/common';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional, validate } from 'class-validator';

export class HeadersPrivateRouteDto {
  @IsOptional()
  @Expose({ name: 'user_id' })
  userId?: string;

  @IsOptional()
  @Expose({ name: 'step' })
  step?: string;

  @IsOptional()
  @Expose({ name: 'action' })
  action?: string;
}

export const HeadersPrivateRoute = createParamDecorator(
  async (value: any, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    const userInfo: { [key: string]: any } = {
      userId: headers.userid,
      step: headers.step,
      action: headers.action,
    };

    const logMessage = `Step: ${userInfo.step}, Action: ${userInfo.action} -> Cognito ID: ${userInfo.userId}`;
    Logger.debug(logMessage, 'Cognito User');
    const dto = plainToClass(value, headers, { excludeExtraneousValues: true });
    const errors: ValidationError[] = await validate(dto);
    if (errors.length > 0) {
      throw formatValidationErrors(errors);
    }

    return userInfo;
  },
);
