import {EntityRepository, Repository} from "typeorm";
import {Worker} from "./worker.entity";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {User} from "../user/user.entity";
import * as config from 'config';
import {UpdateWorkerDto} from "./dto/update-worker.dto";

@EntityRepository(Worker)
export class WorkerRepository extends Repository<Worker> {

    async createWorker({photo, ...workerData}: CreateWorkerDto, creator: User): Promise<Worker> {
        const baseUrl = config.get('baseUrl');
        const worker = new Worker();

        Object.keys(workerData).forEach((key) => {
            worker[key] = workerData[key];
        });
        if (photo) {
            worker.photo = `${baseUrl}/worker/photo/${photo.filename}`;
        }
        worker.creator = creator;

        try {
            await worker.save();
            return worker;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateWorker(workerId: number, {photo, ...workerData}: UpdateWorkerDto, creator: User): Promise<Worker> {
        const baseUrl = config.get('baseUrl');
        const worker = await this.findOne(workerId);

        if (worker.creatorId !== creator.id) {
            throw new Error('Нет прав изменять данные этого пользователя!');
        }

        Object.keys(workerData).forEach((key) => {
            worker[key] = workerData[key];
        });

        if (photo) {
            worker.photo = `${baseUrl}/worker/photo/${photo.filename}`;
        }

        try {
            await worker.save();
            return worker;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

}