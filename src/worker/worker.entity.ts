import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Review} from "../review/review.entity";

@Entity()
export class Worker extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    position: string;

    @Column()
    workPlace: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    photo: string;

    @ManyToOne(type => User, user => user.workers)
    creator: User;

    @OneToMany(type => Review, review => review.worker)
    reviews: Review[];

    @Column()
    creatorId: number;
}