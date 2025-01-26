import {
  Post,
  Get,
  Param,
  Res,
  Controller,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../services/files.service';
import { FilesManagerService } from '../services/files-manager.service';
import { CreateFileInput } from '../dto/inputs/create-file.input';
import { FileInfo } from '../entities/file-info.entity';
import { CurrentContext } from '../../../patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';


  @Controller('/attachment/files')
  @ApiTags('Attachments')
  export class FilesController {
    constructor(
      private filesService: FilesService,
      private filesManagerService: FilesManagerService,
    ) {}

    @Post('')
    @ApiConsumes('multipart/form-data')
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
    @UseInterceptors(FilesInterceptor('file'))
    async upload(
      @CurrentContext() context:IContext,
      @UploadedFiles() files
    ) {
      if(files?.length > 0){
        const file = files[0];
        return await this.filesService.saveImageUrl(context,file)

      }

      // const uploadFiles: Promise<FileInfo>[] = files.map(async (file) => {
      //   const fileArgs: CreateFileInput = {
      //     fileName: file.originalname,
      //     fileBuffer: file.buffer,
      //     fileMongoId: file.id?.toString(),
      //   };
    
      //   const fileResponse = await this.filesService.create(context, fileArgs);
      //   return fileResponse;
      // });
    
      // return await Promise.all(uploadFiles);
    }

    @Get('download/:id')
    async download(
      @CurrentContext() context:IContext,
      @Param('id') id: string, 
      @Res() res: Response
    ) {
      return await this.filesService.download(context, id, res);
    }

  }
  