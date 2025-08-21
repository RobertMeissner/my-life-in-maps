import { Injectable } from '@nestjs/common';
import { Place } from './domain/entities/place.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class PlaceService {
  getLocations(): Place[] {
    return [];
  }
}
