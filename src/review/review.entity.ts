import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn} from 'typeorm';
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
    workingPlace: string;

    @Column()
    workingPosition: string;

    @Column({type: "longtext"})
    review: string;

    @ManyToOne(type => User)
    creator: User;

    @ManyToOne(type => Worker, worker => worker.reviews)
    worker: Worker;

    @CreateDateColumn()
    createdAt: Date;
}