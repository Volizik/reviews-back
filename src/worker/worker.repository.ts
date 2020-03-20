import {EntityRepository, Repository} from "typeorm";
import {Worker} from "./worker.entity";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {User} from "../user/user.entity";

@EntityRepository(Worker)
export class WorkerRepository extends Repository<Worker> {
    async createWorker({
        city,
        country,
        firstName,
        lastName,
        position,
        workPlace
    }: CreateWorkerDto, creator: User): Promise<Worker> {
        const worker = new Worker();

        worker.city = city;
        worker.country = country;
        worker.firstName = firstName;
        worker.lastName = lastName;
        worker.position = position;
        worker.workPlace = workPlace;
        worker.creatorId = creator.id;

        try {
            await worker.save();
            return worker;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}