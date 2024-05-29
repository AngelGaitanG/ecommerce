import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }



    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('image'))
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