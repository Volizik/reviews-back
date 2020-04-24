import { Injectable } from '@nestjs/common';
import {UpdateReviewDto} from "./dto/update-review.dto";
import {CreateReviewDto} from "./dto/create-review.dto";
import {Review} from "./review.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewRepository} from "./review.repository";
import {User} from "../user/user.entity";

@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(ReviewRepository)
        private reviewRepository: ReviewRepository,
    ) {}

    async getAll(): Promise<Review[]> {
        return await this.reviewRepository.find();
    }

    async getById(id: string): Promise<Review> {
        return await this.reviewRepository.findOne(id);
    }

    // delete(id: string): Review {
    //     const review = this.reviews.find(r => r.id === id);
    //     this.reviews = this.reviews.filter(r => r.id !== id);
    //     return review;
    // }
    //
    create(review: CreateReviewDto, photo: Express.Multer.File, creator: User): Promise<Review> {
        return this.reviewRepository.createReview(review, photo, creator)
    }

    update(
        id: string,
        updateReviewDto: UpdateReviewDto,
        photo: Express.Multer.File,
        creator: User
    ): Promise<Review> {
        return this.reviewRepository.updateReview(id, updateReviewDto, photo, creator);
    }

}
