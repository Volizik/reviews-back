import {EntityRepository, Repository} from "typeorm";
import {Review} from "./review.entity";
import {CreateReviewDto} from "./dto/create-review.dto";
import {InternalServerErrorException} from "@nestjs/common";

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {

    async createReview(data: CreateReviewDto): Promise<Review> {
        const review = new Review();

        Object.keys(data).forEach((key) => {
            review[key] = data[key];
        });

        try {
            await review.save();
            return review;
        }
        catch (error) {
            throw new InternalServerErrorException();
        }

    }

}