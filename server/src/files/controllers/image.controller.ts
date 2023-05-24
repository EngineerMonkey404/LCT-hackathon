import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from '../ services/image.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Картинки пользователя')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(':userId')
  async addUserImage(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.imageService.addImage({
      userId: userId,
      path: file.filename,
    });
  }

  @Get(':id')
  async getImage(@Param('id', ParseIntPipe) id: number, @Res() res) {
    const image = await this.imageService.getImage(id);
    res.download(this.imageService.getFilePath(image.path));
  }

  @Delete(':id')
  deleteImage(@Param('id') id: number) {
    return this.imageService.deleteImage(id);
  }
}
