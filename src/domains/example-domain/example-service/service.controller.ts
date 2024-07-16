import { EXAMPLE, EXAMPLE_API_TAG } from '@application/constants';
import { HeadersPrivateRoute, HeadersPrivateRouteDto } from '@application/decorators';
import { validateDto } from '@application/helpers';
import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExampleRequest, IExampleRespose } from './models';
import { ExampleService } from './services';


@ApiTags(EXAMPLE_API_TAG)
@Controller(EXAMPLE.root)
@UsePipes(new ValidationPipe({ transform: true }))
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get(EXAMPLE.example)
  async getPoliticalExposureList(
    @HeadersPrivateRoute(HeadersPrivateRouteDto)
    headers: HeadersPrivateRouteDto,
  ): Promise<IExampleRespose> {
        const exampleRequest = (await validateDto(ExampleRequest, {
          ...headers,
          // Add more fields here like body, query, etc.
        })) as ExampleRequest;
        return await this.exampleService.exampleService(exampleRequest);
    
  }
}
