import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PhotoRepository} from "./photo.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([PhotoRepository])
    ],
})
export class PhotoModule {}
