import { PlaceDto } from './place.dto';

export interface PlacemarkDto {
  Placemark: [
    {
      name: string;
      TimeStamp: [{ when: string }];
      Point: [{ coordinates: [string] }];
    },
  ];
}

export interface KmlDocumentDto {
  Document: PlacemarkDto[];
}
