import { HttpContextMiddleware } from '@application/middlewares';
import { DomainsModule } from '@domain/domains.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ApplicationModule } from './application';

@Module({
  imports: [DomainsModule, ApplicationModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpContextMiddleware).forRoutes('*');
  }
}
