import { Injectable } from '@nestjs/common';
import {Review} from "./review.interfaces";
import {UpdateReviewDto} from "./dto/update-review.dto";
import {CreateReviewDto} from "./dto/create-review.dto";

@Injectable()
export class ReviewService {

    private reviews: Review[] = [
        {
            id: '1',
            uid: '1',
            wid: '1',
            title: 'title text',
            message: 'message text',
        }
    ];

    getAll(): Review[] {
        return this.reviews;
    }

    getByFilter(): Review[] {
        return this.reviews;
    }

    getById(id: string): Review {
        return this.reviews.find(r => r.id === id);
    }

    update({ id, message, title }: UpdateReviewDto): Review {
        let review: Review;
        this.reviews.map(r => {
            if (r.id === id) {
                r.message = message ?? r.message;
                r.title = title ?? r.title;
            }
        });
        return review;
    }

    delete(id: string): Review {
        const review = this.reviews.find(r => r.id === id);
        this.reviews = this.reviews.filter(r => r.id !== id);
        return review;
    }

    public create({ message, title }: CreateReviewDto): Review {
        const review = {
            id: (this.reviews.length + 1).toString(),
            uid: (this.reviews.length + 1).toString(),
            wid: (this.reviews.length + 1).toString(),
            title,
            message
        };
        this.reviews.push(review);
        return review;
    }

}
