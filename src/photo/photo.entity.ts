import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as config from 'config';
import {Worker} from "../worker/worker.entity";

const baseUrl = config.get('baseUrl');

@Entity()
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: `${baseUrl}/worker/photo/default_photo.png`})
    src: string;

    @ManyToOne(type => Worker, worker => worker.photos)
    worker: Worker
    @Column()
    workerId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}