import { Body, Controller, Post } from '@nestjs/common';
import { KmlFileProcessingService } from '../../application/services/kml-file-processing.service';
import { ProcessKmlDto } from '../../application/dto/process-kml.dto';
import { ProcessKmlResponseDto } from '../../application/dto/process-kml-response.dto';

@Controller('kml')
export class KmLController {
  constructor(
    private readonly kmlProcessingService: KmlFileProcessingService,
  ) {}

  @Post('process')
  async processKmlFile(
    @Body() processKmlDto: ProcessKmlDto,
  ): Promise<ProcessKmlResponseDto> {
    return {
      data: { placesCount: 0, places: [] },
      error: await this.kmlProcessingService.processFile(
        processKmlDto.filename,
      ),
    };
  }
}
