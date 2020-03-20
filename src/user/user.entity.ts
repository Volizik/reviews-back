import {Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity, OneToMany} from 'typeorm';
import {Worker} from "../worker/worker.entity";

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    name?: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({ select: false })
    password: string;

    @OneToMany(type => Worker, worker => worker.creator)
    workers: Worker[];
}