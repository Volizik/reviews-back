import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ReviewService} from "./review.service";
import {Review} from "./review.interfaces";
import {CreateReviewDto} from "./dto/create-review.dto";
import {UpdateReviewDto} from "./dto/update-review.dto";

@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) {
    }

    @Get('')
    getAll(): Review[] {
        return this.reviewService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Review {
        return this.reviewService.getById(id);
    }

    @Post('')
    create(@Body() body: CreateReviewDto): Review {
        return this.reviewService.create(body);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body: UpdateReviewDto
    ): Review {
        return this.reviewService.update({ id, ...body });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Review {
        return this.reviewService.delete(id);
    }

}
