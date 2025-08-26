import { Injectable } from '@nestjs/common';
import { parseStringPromise } from 'xml2js';
import { KmlFileSystemService } from '../../infrastructure/services/kml-file-system.service';
import { PlaceDto } from '../dto/place.dto';
import { KmlDocumentDto, PlacemarkDto } from '../dto/kml.dto';
import { Place } from '../../domain/entities/place.entity';
import { PlaceValidationService } from './place-validation-service';

@Injectable()
export class KmlFileProcessingService {
  constructor(
    private readonly fileSystemService: KmlFileSystemService,
    private readonly validationService: PlaceValidationService,
  ) {}

  async processFile(filename: string): Promise<string> {
    // abstract file sources away - instead of filename, I could get a uri and decide upon thant
    const content = await this.fileSystemService.readFile(filename);
    const parsedData = content;
    const validatedData = parsedData;
    return validatedData;
  }

  async parseKmlToPlaces(kmlContent: string): Promise<Place[]> {
    try {
      if (kmlContent?.trim()) {
        const parsedKml: KmlDocumentDto = (await parseStringPromise(
          kmlContent,
        )) as KmlDocumentDto;
        const places = this.extractPlacesFromKml(parsedKml);
        return await this.validateAndTransformPlaces(places);
      }
      throw new Error('KML content is empty or invalid');
    } catch (error) {
      throw new Error(`Failed to parse KML: ${error.message}`);
    }
  }

  private extractPlacesFromKml(parsedKml: KmlDocumentDto): PlaceDto[] {
    const placemarks: PlacemarkDto[] = Array.isArray(parsedKml.Document)
      ? parsedKml.Document
      : parsedKml.Document
        ? [parsedKml.Document]
        : [];

    const results = placemarks.map((placemark) => {
      const coordinates: string =
        placemark.Placemark[0].Point[0].coordinates[0];

      const x: string[] = coordinates.split(',');

      return {
        latitude: parseFloat(x[1]),
        longitude: parseFloat(x[0]),
        name: placemark.Placemark[0].name[0],
        createdAt: new Date(), // TODO: placemark.Placemark[0].TimeStamp[0].when
        id: 'test',
      } as Place;
    });
    return results;
  }

  private async validateAndTransformPlaces(
    places: PlaceDto[],
  ): Promise<Place[]> {
    return Promise.all(
      places.map((dto) => this.validationService.validatedPlace(dto)),
    );
  }
}
