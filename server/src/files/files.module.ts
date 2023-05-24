import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ImageService } from './ services/image.service';
import { Image } from './models/image.model';
import { ImageController } from './controllers/image.controller';
import { User } from '../auth/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Image, User])],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class FilesModule {}
