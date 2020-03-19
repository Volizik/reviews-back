import {Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity} from 'typeorm';

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

    @Column()
    password: string;
}