import { Expose } from 'class-transformer';
import { IExampleRequest } from './example.base';


export class ExampleRequest implements IExampleRequest {
  @Expose({ name: 'userId' })
  userId: string;
}
