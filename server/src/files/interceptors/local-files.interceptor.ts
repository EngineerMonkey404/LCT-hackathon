import { Injectable, NestInterceptor, Type, mixin } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

function LocalFilesInterceptor(fieldName: string): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination: configService.get('STORAGE_PATH'),
          filename: (req, file, callback) => {
            callback(null, `${uuid()}`);
          },
        }),
      };

      this.fileInterceptor = new (FileInterceptor(fieldName, multerOptions))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFilesInterceptor;
