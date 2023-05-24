import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from '../ services/image.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import LocalFilesInterceptor from '../interceptors/local-files.interceptor';

@ApiTags('Картинки пользователя')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseInterceptors(LocalFilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Добавление картинки предмета' })
  @ApiOkResponse({
    description: 'Добавление картинки предмета',
    type: Number,
  })
  @ApiBody({
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
  @Post(':userId')
  async addUserImage(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('FILE', file);
    return await this.imageService.addImage({
      userId: userId,
      path: file.filename,
    });
  }

  @Get(':id')
  async getImage(@Param('id', ParseIntPipe) id: number, @Res() res) {
    const image = await this.imageService.getImageByUserId(id);
    res.download(this.imageService.getFilePath(image.path));
  }

  @Delete(':id')
  deleteImage(@Param('id') id: number) {
    return this.imageService.deleteImage(id);
  }
}
