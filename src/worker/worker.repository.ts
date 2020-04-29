import {EntityRepository, Repository} from "typeorm";
import {Worker} from "./worker.entity";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {User} from "../user/user.entity";
import {UpdateWorkerDto} from "./dto/update-worker.dto";

@EntityRepository(Worker)
export class WorkerRepository extends Repository<Worker> {

    async createWorker(workerData: CreateWorkerDto, creator: User): Promise<Worker> {
        const worker = new Worker();

        Object.keys(workerData).forEach((key) => {
            worker[key] = workerData[key];
        });
        worker.creator = creator;

        try {
            await worker.save();
            return worker;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateWorker(workerId: number, workerData: UpdateWorkerDto, creator: User): Promise<Worker> {
        const worker = await this.findOne(workerId);

        if (worker.creatorId !== creator.id) {
            throw new Error('Нет прав изменять данные этого пользователя!');
        }

        Object.keys(workerData).forEach((key) => {
            worker[key] = workerData[key];
        });

        try {
            await worker.save();
            return worker;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}