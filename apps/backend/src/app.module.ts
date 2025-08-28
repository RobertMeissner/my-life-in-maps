import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, PlaceService } from './app.service';
import { KmLController } from './presentation/controllers/kml.controller';
import { KmlFileProcessingService } from './application/services/kml-file-processing.service';
import { KmlFileSystemService } from './infrastructure/services/kml-file-system.service';
import { PlaceValidationService } from './application/services/place-validation-service';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [SentryModule.forRoot()],
  controllers: [AppController, KmLController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    AppService,
    PlaceService,
    KmlFileProcessingService,
    KmlFileSystemService,
    PlaceValidationService,
  ],
})
export class AppModule {}
