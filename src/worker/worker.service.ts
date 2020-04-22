import {Injectable} from '@nestjs/common';
import {Worker} from "./worker.entity";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {WorkerRepository} from "./worker.repository";
import {User} from "../user/user.entity";

@Injectable()
export class WorkerService {

    constructor(
        private workerRepository: WorkerRepository,
    ) {}

    async findAll(): Promise<Worker[]> {
        return this.workerRepository.find();
    }

    async findById(id: string): Promise<Worker> {
        return this.workerRepository.findOne(id);
    }

    async create(createWorkerDto: CreateWorkerDto, user: User): Promise<Worker> {
        return await this.workerRepository.createWorker(createWorkerDto, user);
    }

}
