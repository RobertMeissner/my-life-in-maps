import { Controller, Get } from '@nestjs/common';
import { AppService, PlaceService } from './app.service';
import { Place } from './domain/entities/place.entity';
import * as Sentry from '@sentry/nestjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly locationService: PlaceService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('places')
  getPlaces(): Place[] {
    Sentry.logger.info('User triggered test error', {
      action: 'test_error_endpoint',
    });
    console.log('Test log for Sentry');
    return this.locationService.getLocations();
  }
}
