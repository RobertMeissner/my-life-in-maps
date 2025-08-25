import { Injectable } from '@nestjs/common';
import { KmlFileSystemService } from '../../infrastructure/services/kml-file-system.service';

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
}
