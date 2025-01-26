import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { FileInfo } from '../entities/file-info.entity';
import { CreateFileInput } from '../dto/inputs/create-file.input';
import { FileModes } from '../enums/file-modes.enum';
import { FilesManagerService } from './files-manager.service';
import { getMimeTypeFromExtension } from '../functions/content-type';
import { DataService } from '../../../patterns/crud-pattern/mixins/data-service.mixin';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService extends DataService(FileInfo) {

    constructor(
        private filesManagerService: FilesManagerService,
    ){ super();}

    async create(context:IContext, createFileInput:CreateFileInput): Promise<FileInfo>{
        const file = {} as FileInfo;

        const mongoData = this.filesManagerService.parseFileName(createFileInput.fileName);
        file.fileExtension  = mongoData.fileType
        file.fileMode = process.env.DB_FILE_MODE as FileModes
        file.fileName = mongoData.fileName
        file.fileMongoId = createFileInput.fileMongoId
        file.fileBuffer = createFileInput.fileBuffer ? Buffer.from(createFileInput.fileBuffer, 'base64') : null;
        // file.fileUrl = process.env.DB_FILE_MODE as FileModes === FileModes.url ? this.
        const repository = this.getRepository(context);

        const result = await repository.save(file);
        delete result.fileBuffer;
        return result;
    }
    async saveImageUrl(context:IContext, file: Express.Multer.File):  Promise<FileInfo> {
        const repository = this.getRepository(context);
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = join(__dirname, '..', '..', '..', '..', 'public', fileName);
    
        writeFileSync(filePath, file.buffer);
        const fileInfo = {} as FileInfo;

        const url = `${process.env.BASE_URL}public/${fileName}`;
        const mongoData = this.filesManagerService.parseFileName(fileName);
        fileInfo.fileName = mongoData.fileName
        fileInfo.fileExtension  = mongoData.fileType
        fileInfo.fileMode = process.env.DB_FILE_MODE as FileModes
        fileInfo.fileName = mongoData.fileName
        fileInfo.fileUrl = `public/${fileName}`;
        
        const result = await repository.save(fileInfo);
        return result
        // Genera una URL estilo S3

    }

    async download(context:IContext, id: string, res: Response): Promise<void> {
        const repository = this.getRepository(context);
        const entity = await repository.findOne({ where: { id }, select: ["fileBuffer", "fileExtension", "fileMode", "fileMongoId", "fileName"] });

        res.header('Content-Type', await getMimeTypeFromExtension(entity.fileExtension));
        res.header('Content-Disposition', `attachment; filename=${entity.fileName}.${entity.fileExtension}`);

        switch(entity.fileMode){
            case FileModes.mongo:
                const fileStream = await this.filesManagerService.readStream(entity.fileMongoId?.trim());
                if (!fileStream) {
                  throw new InternalServerErrorException('File not found');
                }
            
                fileStream.once('error', (error) => {
                    throw new InternalServerErrorException('File can´t read, ' + error);
                });
            
                fileStream.pipe(res);
                break;
            case FileModes.buffer:
                res.send(entity.fileBuffer);
                break;
            case FileModes.url:
                break;
            default:
                throw new BadRequestException('File mode not found');
        }
    }

}
