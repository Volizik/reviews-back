import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

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

    @ManyToOne(type => User, user => user.workers)
    creator: User;

    @Column()
    creatorId: number;
}