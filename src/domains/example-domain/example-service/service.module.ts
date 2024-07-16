import { Module } from '@nestjs/common';
import { ApplicationModule } from '@src/application';

import { ExampleController } from './service.controller';
import { ExampleService } from './services';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
  imports: [ApplicationModule],
})
export class ExampleModule {}
