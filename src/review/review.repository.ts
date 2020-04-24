import {EntityRepository, getCustomRepository, Repository} from "typeorm";
import {Review} from "./review.entity";
import {CreateReviewDto} from "./dto/create-review.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {WorkerRepository} from "../worker/worker.repository";
import {User} from "../user/user.entity";
import {UpdateReviewDto} from "./dto/update-review.dto";

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {

    async createReview({text, ...workerData}: CreateReviewDto, photo: Express.Multer.File, creator: User): Promise<Review> {
        const review = new Review();

        const workerRepository = getCustomRepository(WorkerRepository);
        const worker = await workerRepository.createWorker({...workerData, photo}, creator);

        review.text = text;
        review.creator = creator;
        review.worker = worker;

        try {
            await review.save();
            return review;
        }
        catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }

    }

    async updateReview(id: string, {text, ...workerData}: UpdateReviewDto, photo: Express.Multer.File, creator: User): Promise<Review> {
        const review = await this.findOne(id);

        if (review.creatorId !== creator.id) {
            throw new Error('Нет прав изменять данные этого пользователя!');
        }

        const workerRepository = getCustomRepository(WorkerRepository);
        await workerRepository.updateWorker(
            review.worker.id,
            {photo, ...workerData},
            creator,
        );

        review.text = text;

        try {
            await review.save();
            return review;
        }
        catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }

    }

}