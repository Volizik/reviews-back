import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ReviewService} from "./review.service";
import {CreateReviewDto} from "./dto/create-review.dto";
import {UpdateReviewDto} from "./dto/update-review.dto";
import { Review } from './review.entity'
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) {
    }

    @Get('')
    getAll(): Promise<Review[]> {
        return this.reviewService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Review> {
        return this.reviewService.getById(id);
    }

    @Post('')
    create(@Body() body: CreateReviewDto): Promise<Review> {
        return this.reviewService.create(body);
    }

    @Post('photo')
    @UseInterceptors(FileInterceptor('photo'))
    uploadPhoto(@UploadedFile() photo) {
        console.log(photo)
    }

    // @Put(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() body: UpdateReviewDto
    // ): Review {
    //     return this.reviewService.update({ id, ...body });
    // }
    //
    // @Delete(':id')
    // delete(@Param('id') id: string): Review {
    //     return this.reviewService.delete(id);
    // }

}
