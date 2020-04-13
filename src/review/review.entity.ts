import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";
import {Worker} from "../worker/worker.entity";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    fatherName: string;

    @Column()
    livingCountry: string;

    @Column()
    livingCity: string;

    @Column()
    livingStreet: string;

    @Column()
    livingHouseNumber: string;

    @Column()
    workingCountry: string;

    @Column()
    workingCity: string;

    @Column()
    workingStreet: string;

    @Column()
    workingHouseNumber: string;

    @Column()
    workingPosition: string;

    @Column()
    review: string;

    @ManyToOne(type => User)
    creator: User;

    @ManyToOne(type => Worker, worker => worker.reviews)
    worker: Worker;
}