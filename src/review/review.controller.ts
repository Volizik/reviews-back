import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ReviewService} from "./review.service";
import {CreateReviewDto} from "./dto/create-review.dto";
import {UpdateReviewDto} from "./dto/update-review.dto";
import { Review } from './review.entity'
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../utils/multer";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../user/user.entity";
import {DeleteResult} from "typeorm";

@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) {}

    @Get('')
    getAll(
        @Query('creatorId') creatorId: string,
    ): Promise<Review[]> {
        return this.reviewService.getAll(creatorId);
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Review> {
        return this.reviewService.getById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    @UseInterceptors(FileInterceptor('photo', multerOptions))
    create(
        @Body() body: CreateReviewDto,
        @UploadedFile() photo: Express.Multer.File,
        @GetUser() user: User,
    ): Promise<Review> {
        return this.reviewService.create(body, photo, user);
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
