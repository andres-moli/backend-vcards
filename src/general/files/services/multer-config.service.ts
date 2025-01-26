import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';
import { FileModes } from '../enums/file-modes.enum';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  
  constructor() {

    switch(process.env.DB_FILE_MODE){
      case FileModes.mongo:
        this.gridFsStorage = new GridFsStorage({
          url: process.env.DB_MONGODB_SERVER +'/' + process.env.DB_MONGODB_NAME,
          file: (req, file) => {
            return new Promise((resolve, reject) => {
              const filename = file.originalname.trim();
              const fileInfo = {
                filename: filename,
              };
              resolve(fileInfo);
            });
          },
        });
        break;
      case FileModes.buffer:
        break;
      case FileModes.url:
        break;
      default:
        new Error('File mode not found');
      }
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
