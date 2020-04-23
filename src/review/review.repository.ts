import {EntityRepository, getCustomRepository, Repository} from "typeorm";
import {Review} from "./review.entity";
import {CreateReviewDto} from "./dto/create-review.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {WorkerRepository} from "../worker/worker.repository";
import {User} from "../user/user.entity";

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

}