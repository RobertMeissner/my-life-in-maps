import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class PlaceDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @IsDate()
  createdAt: Date;
}
