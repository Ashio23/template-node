import { HTTP_ADAPTER, HttpAdapter } from '@application/adapters';
import { EnvironmentService } from '@application/environment';
import { AppError, InternalErrorType } from '@application/template';
import { Inject, Injectable } from '@nestjs/common';

import { IBackendRequest, IBackendResponse } from '../models';

@Injectable()
export class BackendService {
  constructor(
    @Inject(HTTP_ADAPTER)
    private readonly httpAdapter: HttpAdapter,
    private readonly environmentService: EnvironmentService,
  ) {}

  async setConfirmationBack(
    backendRequest: IBackendRequest,
  ): Promise<IBackendResponse> {
    const payload: IBackendRequest = backendRequest;
    try {
      const url = `${this.environmentService.get(
        'BACKEND_SERVICE_URL',
      )}/controller/service`;
      return await this.httpAdapter.post(url, { ...payload });
    } catch (error) {
      const data = JSON.parse(error.response).detail;
      throw new AppError(InternalErrorType.BAD_REQUEST, data);
    }
  }
}
