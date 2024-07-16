import { Injectable, NotFoundException } from '@nestjs/common';
import { IExampleRequest, IExampleRespose } from '../models';


@Injectable()
export class ExampleService {
  constructor() {}

  async exampleService(exampleRequest: IExampleRequest): Promise<IExampleRespose> {
    const { userId } = exampleRequest;

    if (userId) {
      return {
        id: '123',
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
