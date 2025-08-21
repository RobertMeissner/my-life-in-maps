import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, PlaceService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PlaceService],
})
export class AppModule {}
