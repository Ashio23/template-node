import { Module } from '@nestjs/common';

import { BackendService } from './services';

@Module({
  providers: [BackendService],
  exports: [BackendService],
})
export class BackendModule {}
