import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Review} from "../review/review.entity";
import * as config from 'config';

const baseUrl = config.get('baseUrl');

@Entity()
export class Worker extends BaseEntity {
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

    @Column({default: `${baseUrl}/worker/photo/default_photo.png`})
    photo?: string;

    @ManyToOne(type => User, user => user.workers)
    creator: User;

    @Column()
    creatorId: number;

    // @OneToMany(type => Review, review => review.worker)
    // reviews: Review[];

    @CreateDateColumn()
    createdAt: Date;
}