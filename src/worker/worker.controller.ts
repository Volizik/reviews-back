import {Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {Worker} from "./worker.entity";
import {WorkerService} from "./worker.service";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../user/user.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../utils/multer";
import * as config from 'config';
import { resolve } from 'path'

// @UseGuards(AuthGuard('jwt'))
@Controller('worker')
export class WorkerController {

    constructor(private workerService: WorkerService) {}

    @Get()
    async getAll(): Promise<Worker[]> {
        return this.workerService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Worker> {
        return this.workerService.findById(id);
    }

    @Post('/photo')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async upload(@UploadedFile() file): Promise<string> {
        const baseUrl = config.get('baseUrl');
        console.log(file)
        return `${baseUrl}/worker/photo/${file.filename}`
    }

    @Get('photo/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<void> {
        res.sendFile(resolve(__dirname, '..', '..', '..', 'public', 'photo', fileId));
    }

    @Post()
    async create(
        @Body() createWorkerDto: CreateWorkerDto,
        @GetUser() user: User,
    ): Promise<Worker> {
        return this.workerService.create(createWorkerDto, user);
    }

}
