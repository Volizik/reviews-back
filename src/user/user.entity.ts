import {Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity, OneToMany} from 'typeorm';
import {Worker} from "../worker/worker.entity";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(type => Worker, worker => worker.creator)
    workers: Worker[];
}