import {User} from "../../user/user.entity";

export interface CreateReviewBodyDto {
    firstName: string;
    lastName: string;
    fatherName: string;
    country: string;
    city: string;
    position: string;
    workingPlace: string;
    text: string;
}

export interface CreateReviewDto {
    body: CreateReviewBodyDto;
    photo?: Express.Multer.File;
    user: User;
}