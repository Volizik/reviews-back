import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReviewRepository} from "./review.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewRepository])
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
