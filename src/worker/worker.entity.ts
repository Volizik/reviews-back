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
import {Photo} from "../photo/photo.entity";

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
    tin: string;

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
