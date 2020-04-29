import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../user/user.entity";
import {Review} from "../review/review.entity";
import * as config from 'config';
import {Photo} from "../photo/photo.entity";

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
    country: string;

    @Column()
    city: string;

    @Column()
    workingPlace: string;

    @Column()
    position: string;

    @OneToMany(type => Photo, photo => photo.worker, {eager: true})
    photos: Photo[];

    @ManyToOne(type => User, user => user.workers)
    creator: User;
    @Column()
    creatorId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}