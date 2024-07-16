import { Module } from '@nestjs/common';

import { AdaptersModule } from './adapters';
import { EnvironmentModule } from './environment';
@Module({
  imports: [EnvironmentModule, AdaptersModule],
})
export class ApplicationModule {}
