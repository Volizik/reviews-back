import {Worker} from "../../worker/worker.entity";

export interface AddSinglePhotoDto {
    file?: Express.Multer.File;
    worker: Worker;
}