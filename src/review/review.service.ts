import { Injectable } from '@nestjs/common';
import {UpdateReviewDto} from "./dto/update-review.dto";
import {CreateReviewDto} from "./dto/create-review.dto";
import {Review} from "./review.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewRepository} from "./review.repository";

@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(ReviewRepository)
        private reviewRepository: ReviewRepository,
    ) {}

    async getAll(): Promise<Review[]> {
        return await this.reviewRepository.find();
    }

    // getByFilter(): Review[] {
    //     return this.reviews;
    // }

    async getById(id: string): Promise<Review> {
        return await this.reviewRepository.findOne(id);
    }

    // update({ id, message, title }: UpdateReviewDto): Review {
    //     let review: Review;
    //     this.reviews.map(r => {
    //         if (r.id === id) {
    //             r.message = message ?? r.message;
    //             r.title = title ?? r.title;
    //         }
    //     });
    //     return review;
    // }
    //
    // delete(id: string): Review {
    //     const review = this.reviews.find(r => r.id === id);
    //     this.reviews = this.reviews.filter(r => r.id !== id);
    //     return review;
    // }
    //
    public create(review: CreateReviewDto, photo: Express.Multer.File): Promise<Review> {
        return this.reviewRepository.createReview(review, photo)
    }

}
