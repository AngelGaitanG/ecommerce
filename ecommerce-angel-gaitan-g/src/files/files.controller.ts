import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }



    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiBearerAuth()
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
    @ApiParam({
        name: 'id',
        description: 'The ID of the product',
        type: 'string',
    })
    async uploadImage(@Param('id') id:string, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 4000000, message: 'El tamaño maximo es de 4MB' }),
                new FileTypeValidator({
                    fileType: /(jpg|jpeg|png|webp)$/,
                })
            ]
        })
    ) file: Express.Multer.File) {
        await this.filesService.uploadFile(file,id);

        return 'Imagen cambiada con exito'
}
}