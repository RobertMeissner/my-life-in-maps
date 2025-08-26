import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { parseStringPromise } from 'xml2js';
import { KmlFileSystemService } from '../../infrastructure/services/kml-file-system.service';
import { Place } from '../../domain/entities/place.entity';
import { PlaceDto } from '../dto/place.dto';
import { KmlDocumentDto, PlacemarkDto } from '../dto/kml.dto';

@Injectable()
export class KmlFileProcessingService {
  constructor(private readonly fileSystemService: KmlFileSystemService) {}

  async processFile(filename: string): Promise<string> {
    // abstract file sources away - instead of filename, I could get a uri and decide upon thant
    const content = await this.fileSystemService.readFile(filename);
    const parsedData = content;
    const validatedData = parsedData;
    return validatedData;
  }

  async parseKmlToPlaces(kmlContent: string): Promise<PlaceDto[]> {
    try {
      if (kmlContent?.trim()) {
        return parseStringPromise(kmlContent).then(
          (parsedKml: KmlDocumentDto) => {
            const places = this.extractPlacesFromKml(parsedKml);
            //return this.validateAndTransformPlaces(places);
            return places;
          },
        );
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

    const results = placemarks.map((placemark, index: number) => {
      const coordinates: string =
        placemark.Placemark[0].Point[0].coordinates[0];

      const x: string[] = coordinates.split(',');

      return { latitude: parseFloat(x[1]) };
    });
    return results;
  }
}
