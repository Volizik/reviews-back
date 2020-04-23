import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Worker} from "../worker/worker.entity";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "longtext"})
    text: string;

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
}