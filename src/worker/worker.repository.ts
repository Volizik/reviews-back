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
        console.log(workerData)
        try {
            await worker.save();
            return worker;
        } catch (error) {
            console.log(error)
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

    async findByName(name: string): Promise<Worker[]> {
        const [a, b, c] = name.split(' ');

        return await this.createQueryBuilder("worker")
            .where(`
                worker.firstName LIKE :a OR worker.lastName LIKE :b OR worker.fatherName LIKE :c OR
                worker.firstName LIKE :b OR worker.lastName LIKE :c OR worker.fatherName LIKE :a OR
                worker.firstName LIKE :c OR worker.lastName LIKE :a OR worker.fatherName LIKE :b
            `, { a: `%${a}%`, b: `%${b}%`, c: `%${c}%` })
            .getMany();
    }

}
