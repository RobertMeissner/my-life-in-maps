import { KmlFileProcessingService } from './kml-file-processing.service';
import { KmlFileSystemService } from '../../infrastructure/services/kml-file-system.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PlaceValidationService } from './place-validation-service';

describe('KmlFileProcessingService', () => {
  let service: KmlFileProcessingService;
  let mockFileSystemService: jest.Mocked<KmlFileSystemService>;
  let mockPlaceValidationService: jest.Mocked<PlaceValidationService>;

  beforeEach(async () => {
    console.log('setting up');
    const mockFileSystemServiceImpl = {
      readFile: jest.fn(),
      fileExists: jest.fn(),
    };

    const mockPlaceValidationServiceImp = {
      validatedPlace: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KmlFileProcessingService,
        {
          provide: KmlFileSystemService,
          useValue: mockFileSystemServiceImpl,
        },
        {
          provide: PlaceValidationService,
          useValue: mockPlaceValidationServiceImp,
        },
      ],
    }).compile();

    service = module.get<KmlFileProcessingService>(KmlFileProcessingService);
    mockFileSystemService = module.get(KmlFileSystemService);
    mockPlaceValidationService = module.get(PlaceValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse KML objects to Place objects', async () => {
    const kmlContent = `<Document><Placemark><name>Test</name><Point><coordinates>7.6,51.9</coordinates></Point></Placemark></Document>`;
    const realValidationModule = await Test.createTestingModule({
      providers: [
        KmlFileProcessingService,
        KmlFileSystemService,
        PlaceValidationService /* mock file system */,
      ],
    }).compile();

    const realService = realValidationModule.get<KmlFileProcessingService>(
      KmlFileProcessingService,
    );

    const places = await realService.parseKmlToPlaces(kmlContent);
    expect(places).toHaveLength(1);
    expect(places[0].latitude).toBeCloseTo(51.9);
    expect(places[0].longitude).toBeCloseTo(7.6);
  });

  it('should parse KML objects to Place objects, if we skip the xml parsing', async () => {
    const kmlContent = `<Document><Placemark><name>Test</name><Point><coordinates>7.6,51.9</coordinates></Point></Placemark></Document>`;
    jest.spyOn(mockPlaceValidationService, 'validatedPlace').mockResolvedValue({
      latitude: 51.9,
      id: '1',
      name: 'test',
      longitude: 0,
      createdAt: new Date(),
    });
    const places = await service.parseKmlToPlaces(kmlContent);
    expect(places).toHaveLength(1);
    expect(places[0].latitude).toBeCloseTo(51.9);
    expect(places[0].longitude).toBeCloseTo(0);
  });
});
