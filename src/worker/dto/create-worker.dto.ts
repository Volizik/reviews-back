export interface CreateWorkerDto {
    firstName: string;
    lastName: string;
    fatherName: string;
    livingCountry: string;
    livingCity: string;
    livingStreet: string;
    livingHouseNumber: string;
    workingCountry: string;
    workingCity: string;
    workingStreet: string;
    workingHouseNumber: string;
    workingPlace: string;
    workingPosition: string;
    photo?: Express.Multer.File;
}