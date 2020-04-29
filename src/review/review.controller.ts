import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query, UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ReviewService} from "./review.service";
import {CreateReviewBodyDto} from "./dto/create-review.dto";
import {UpdateReviewDto} from "./dto/update-review.dto";
import { Review } from './review.entity'
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../utils/multer";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../user/user.entity";
import {DeleteResult} from "typeorm";
import {ReviewsFilterDTO} from "./dto/reviews-filter.dto";

@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) {}

    @Get('')
    getAll(
        @Query() reviewsFilterDTO: ReviewsFilterDTO,
    ): Promise<Review[]> {
        return this.reviewService.getAll(reviewsFilterDTO);
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Review> {
        return this.reviewService.getById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    @UseInterceptors(FileInterceptor('photo', multerOptions))
    create(
        @Body() body: CreateReviewBodyDto,
        @UploadedFile() photo: Express.Multer.File,
        @GetUser() user: User,
    ): Promise<Review> {
        return this.reviewService.create({body, photo, user});
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @UseInterceptors(FileInterceptor('photo', multerOptions))
    update(
        @Param('id') id: string,
        @Body() body: UpdateReviewDto,
        @UploadedFile() photo: Express.Multer.File,
        @GetUser() user: User,
    ): Promise<Review> {
        return this.reviewService.update(id, body, photo, user);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<DeleteResult> {
        return this.reviewService.delete(id);
    }

}
