import { Injectable } from '@nestjs/common';
import { Image } from '../models/image.model';
import { User } from '../../auth/models/user.model';
import { CreateImageDto } from '../models/CreateImageDto';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../environmentVars';
import * as fs from 'fs/promises';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image) private imageModel: typeof Image,
    private configService: ConfigService<EnvironmentVariables>,
  ) {}

  async getImageByUserId(id: number) {
    const image = this.imageModel.findOne({ where: { userId: id } });
    if (!image) return null;
    return image;
  }

  async addImage(img: CreateImageDto) {
    return (
      await this.imageModel.create({ path: img.path, userId: img.userId })
    ).imageId;
  }

  getFilePath(src: string) {
    return path.join(this.configService.get('STORAGE_PATH'), src);
  }

  private async removeFile(src: string) {
    return fs.unlink(this.getFilePath(src));
  }

  async deleteImage(id: number) {
    const img = await this.getImageByUserId(id);
    if (img) {
      await this.removeFile(img.path);
      await this.imageModel.destroy({ where: { imageId: id } });
    }
  }
}
