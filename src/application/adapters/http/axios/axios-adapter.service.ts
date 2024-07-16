import { AppError } from '@application/errors';
import { IError, LoggerCustomService } from '@application/helpers';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { HttpAdapter, HttpAdapterOptions } from '../http-adapter.interface';
import { AXIOS_INSTANCE } from './axios-instance.token';

@Injectable()
export class AxiosAdapterService implements HttpAdapter {
  private readonly logger: LoggerCustomService;
  constructor(
    @Inject(AXIOS_INSTANCE)
    private readonly axiosInstance: AxiosInstance,
    loggingService: LoggerCustomService,
  ) {
    this.logger = loggingService;
    let axiosRequest: InternalAxiosRequestConfig;
    this.axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      axiosRequest = request;
      return request;
    });
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const trackId = axiosRequest?.headers?.['cognito_id'];
        const url = axiosRequest?.url;
        this.logger.logDone(String(trackId), String(url));
        return response;
      },
      (error: IError) => {
        const cognitoId = axiosRequest.data ? JSON.parse(axiosRequest.data).cognitoId : 'undefined';
        const trackId = cognitoId;
        const url = axiosRequest?.url;
        const data = error.response ? JSON.stringify(error.response.data) : 'undefined';
        const status = error.response ? error.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
        const codeError = error;
        this.logger.logError(
          String(trackId),
          String(url),
          String(codeError),
          data,
        );
        return Promise.reject(new AppError(status, data));
      },
    );
  }

  async get<T = unknown>(url: string, options?: HttpAdapterOptions): Promise<T> {
    const { data } = await this.axiosInstance.get<T>(url, options);
    return data;
  }

  async post<T = unknown>(
    url: string,
    postData: Record<string, unknown>,
    options?: HttpAdapterOptions,
  ): Promise<T> {
    const { data } = await this.axiosInstance.post<T>(url, postData, options);
    return data;
  }

  async put<T = unknown>(
    url: string,
    putData: Record<string, unknown>,
    options: HttpAdapterOptions,
  ): Promise<T> {
    const { data } = await this.axiosInstance.put<T>(url, putData, options);
    return data;
  }

  async delete<T = unknown>(url: string, options?: HttpAdapterOptions): Promise<T> {
    const { data } = await this.axiosInstance.delete<T>(url, options);
    return data;
  }
}
