import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {Worker} from "./worker.entity";
import {WorkerService} from "./worker.service";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../user/user.entity";


@UseGuards(AuthGuard('jwt'))
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

    @Post()
    async create(
        @Body() createWorkerDto: CreateWorkerDto,
        @GetUser() user: User,
    ): Promise<Worker> {
        return this.workerService.create(createWorkerDto, user);
    }

}
