import {EntityRepository, Repository} from "typeorm";
import {InternalServerErrorException} from "@nestjs/common";
import * as config from 'config';
import {Photo} from "./photo.entity";
import {Worker} from "../worker/worker.entity";
import {AddSinglePhotoDto} from "./dto/add-single-photo.dto";

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {

    async addPhotos(photos: Express.Multer.File[], worker: Worker): Promise<Photo[]> {

        const photosArray = photos.map(photo => this.addSinglePhoto({file: photo, worker}))

        return await Promise.all(photosArray);
    }

    addSinglePhoto({file, worker}: AddSinglePhotoDto): Promise<Photo> {
        const baseUrl = config.get('baseUrl');
        const photo = new Photo();

        photo.worker = worker;
        if (!!file) {
            photo.src = `${baseUrl}/worker/photo/${file.filename}`
        } else {
            photo.src = `${baseUrl}/worker/photo/default_photo.png`
        }

        try {
            return photo.save();
        } catch (error) {
            throw new InternalServerErrorException(error);

        }
    }

}