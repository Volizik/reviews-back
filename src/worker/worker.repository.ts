import {EntityRepository, Repository} from "typeorm";
import {Worker} from "./worker.entity";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {User} from "../user/user.entity";
import * as config from 'config';

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
}