import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { KmlFileProcessingService } from '../../application/services/kml-file-processing.service';
import { ProcessKmlDto } from '../../application/dto/process-kml.dto';
import { ProcessKmlResponseDto } from '../../application/dto/process-kml-response.dto';
import { PlaceDto } from '../../application/dto/place.dto';
import { Place } from '../../domain/entities/place.entity';

class PreliminaryProcessKmlResponseDto {
  data: {
    placesCount: number;
    places: PlaceDto[];
  };
  error?: string;
}

@Controller('kml')
export class KmLController {
  constructor(
    private readonly kmlProcessingService: KmlFileProcessingService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'KML file upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadKmlFile(
    @UploadedFile() file: any,
  ): Promise<PreliminaryProcessKmlResponseDto> {
    try {
      if (!file || !file.originalname.endsWith('.kml')) {
        return {
          data: { placesCount: 0, places: [] },
          error: 'No suitable kml file uploaded',
        };
      }

      const kmlContent = file.buffer.toString('utf-8');
      const places =
        await this.kmlProcessingService.parseKmlToPlaces(kmlContent);
      return {
        data: {
          placesCount: places.length,
          places: places as Place[],
        },
      };
    } catch (error) {
      return {
        data: { placesCount: 0, places: [] },
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

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
