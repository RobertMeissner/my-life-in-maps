import { Injectable } from '@nestjs/common';
import { PlaceDto } from '../dto/place.dto';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Place } from '../../../../shared/types/place.types';

@Injectable()
export class PlaceValidationService {
  async validatedPlace(place: PlaceDto): Promise<Place> {
    const dto = plainToInstance(PlaceDto, place);
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${this.formatErrors(errors)}`);
    }
    return dto;
  }

  private formatErrors(errors: ValidationError[]): string {
    return errors
      .map((error) => Object.values(error.constraints || {}).join(', '))
      .join('; ');
  }
}
