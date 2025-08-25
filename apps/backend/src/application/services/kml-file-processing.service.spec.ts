import { KmlFileProcessingService } from './kml-file-processing.service';
import { KmlFileSystemService } from '../../infrastructure/services/kml-file-system.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('KmlFileProcessingService', () => {
  let service: KmlFileProcessingService;
  let mockFileSystemService: jest.Mocked<KmlFileSystemService>;

  beforeEach(async () => {
    console.log('setting up');
    const mockFileSystemServiceImpl = {
      readFile: jest.fn(),
      fileExists: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KmlFileProcessingService,
        {
          provide: KmlFileSystemService,
          useValue: mockFileSystemServiceImpl,
        },
      ],
    }).compile();

    service = module.get<KmlFileProcessingService>(KmlFileProcessingService);
    mockFileSystemService = module.get(KmlFileSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse KML objects to Place objects', async () => {
    const kmlContent = `<Placemark><name>Test</name><Point><coordinates>7.6,51.9</coordinates></Point></Placemark>`;
    const places = await service.parseKmlToPlaces(kmlContent);
    expect(places).toHaveLength(1);
  });
});
