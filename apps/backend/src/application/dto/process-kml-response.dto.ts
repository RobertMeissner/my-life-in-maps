import { Place } from '../../domain/entities/place.entity';

export class ProcessKmlResponseDto {
  data: {
    placesCount: number;
    places: Place[];
  };
  error?: string;
}
