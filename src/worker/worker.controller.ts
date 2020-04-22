import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {Worker} from "./worker.entity";
import {WorkerService} from "./worker.service";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../user/user.entity";
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
