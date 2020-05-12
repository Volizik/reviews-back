import {EntityRepository, getCustomRepository, Repository} from "typeorm";
import {Review} from "./review.entity";
import {CreateReviewDto} from "./dto/create-review.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {WorkerRepository} from "../worker/worker.repository";
import {User} from "../user/user.entity";
import {UpdateReviewDto} from "./dto/update-review.dto";
import {PhotoRepository} from "../photo/photo.repository";

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {

    async createReview({photo, user, body}: CreateReviewDto): Promise<Review> {
        const review = new Review();
        const {text, city, country, position, workingPlace, ...workerData} = body;
        const workerRepository = getCustomRepository(WorkerRepository);
        const worker = await workerRepository.createWorker(workerData, user);

        const photoRepository = getCustomRepository(PhotoRepository);
        await photoRepository.addSinglePhoto({file: photo, worker});

        review.text = text;
        review.city = city;
        review.country = country;
        review.position = position;
        review.workingPlace = workingPlace;
        review.creator = user;
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

    async updateReview(id: string, {text, city, country, position, workingPlace, ...workerData}: UpdateReviewDto, photo: Express.Multer.File, creator: User): Promise<Review> {
        const review = await this.findOne(id);

        if (review.creatorId !== creator.id) {
            throw new Error('Нет прав изменять данные этого пользователя!');
        }

        const workerRepository = getCustomRepository(WorkerRepository);
        await workerRepository.updateWorker(
            review.worker.id,
            workerData,
            creator,
        );

        const photoRepository = getCustomRepository(PhotoRepository);
        await photoRepository.addSinglePhoto({file: photo, worker: review.worker});

        review.text = text;
        review.city = city;
        review.country = country;
        review.workingPlace = workingPlace;
        review.position = position;

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
