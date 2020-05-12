import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Worker} from "../worker/worker.entity";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    workingPlace: string;

    @Column()
    position: string;

    @ManyToOne(type => User)
    creator: User;
    @Column()
    creatorId: number;

    @ManyToOne(type => Worker, {eager: true})
    worker: Worker;
    @Column()
    workerId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
