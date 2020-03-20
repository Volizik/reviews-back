import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {WorkerRepository} from "./worker.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkerRepository])
  ],
  providers: [WorkerService],
  controllers: [WorkerController]
})
export class WorkerModule {}
