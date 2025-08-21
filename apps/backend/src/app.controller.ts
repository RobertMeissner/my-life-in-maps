import { Controller, Get } from '@nestjs/common';
import { AppService, PlaceService } from './app.service';
import { Place } from './domain/entities/place.entity';

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

  @Get()
  getLocations(): Place[] {
    return this.locationService.getLocations();
  }
}
