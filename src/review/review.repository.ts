import {EntityRepository, Repository} from "typeorm";
import {Review} from "./review.entity";
import {CreateReviewDto} from "./dto/create-review.dto";
import {InternalServerErrorException} from "@nestjs/common";
import * as config from 'config';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {

    async createReview(data: CreateReviewDto, photo: Express.Multer.File): Promise<Review> {
        const review = new Review();
        const baseUrl = config.get('baseUrl');

        Object.keys(data).forEach((key) => {
            review[key] = data[key];
        });
        if (photo) {
            review.photo = `${baseUrl}/worker/photo/${photo.filename}`;
        } else {
            review.photo = `${baseUrl}/worker/photo/default_photo.png`;
        }

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