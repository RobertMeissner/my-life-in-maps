import { PlaceDto } from './place.dto';

export interface PlacemarkDto {
  Placemark: [{ Point: [{ coordinates: [string] }] }];
}

export interface KmlDocumentDto {
  Document: PlacemarkDto[];
}
