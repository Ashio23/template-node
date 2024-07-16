import { ApplicationModule } from '@application/application.module';
import { Module } from '@nestjs/common';
import { ExampleModule } from './example-domain';

@Module({
  imports: [
    ApplicationModule,
    ExampleModule,
  ],
})
export class DomainsModule {}
