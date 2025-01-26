import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { GridFSBucketReadStream } from 'mongodb';
import { MongoGridFS } from 'mongo-gridfs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as fs from 'fs-extra';
import * as path from 'path';
import { getMimeTypeFromExtension } from '../functions/content-type';
import { MongoFileInfo } from '../dto/models/file-info.model';
import { DtoToBase64, SaveToFileBase64 } from '../dto/args/file-b64.arg';

@Injectable()
export class FilesManagerService {  
  private fileModel: MongoGridFS;

  constructor(
    @InjectConnection() 
    @Optional()
    private readonly connection: Connection
  ){ 
    this.fileModel = new MongoGridFS(connection?.db as any, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async uploadFile(body: DtoToBase64): Promise<SaveToFileBase64> {
    try {

      const parseFileName = this.parseFileName(body.filename);
      const tempFolder = path.join(__dirname, '..', 'temp');
      const filePath = path.join(tempFolder, `${parseFileName.fileName}.${parseFileName.fileType.toLowerCase()}`);

      return await this.saveStream({
        filename: body.filename,
        mimetype: getMimeTypeFromExtension(parseFileName.fileType),
        path: filePath
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async saveStream(file: SaveToFileBase64) {
    const fileReadStream = fs.createReadStream(file.path);
    const file_uploaded = await this.fileModel.writeFileStream(fileReadStream, {
      filename: file.filename,
      contentType: file.mimetype,
    });
    return file_uploaded._id.toString();
  }

  async findInfo(id: string): Promise<MongoFileInfo> {
    const result = await this.fileModel
      .findById(id)
      .catch((err) => {
        throw new NotFoundException('File not found');
      })
      .then((result) => result);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
  
  async donwloadFile(id: string): Promise<string> {
    return this.fileModel.downloadFile(id);
  }

  parseFileName(fileName: string) {

    const fileExtension = fileName.match(/\.[^.]*$/)[0];
  
    const fileType = fileExtension.slice(1);
  
    const fileNameWithoutExtension = fileName.replace(fileExtension, '').trim();
  
    return {
      fileName: fileNameWithoutExtension,
      fileType: fileType,
      fileExtension: fileExtension,
    };
  }
}
