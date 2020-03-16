import { Injectable } from '@nestjs/common';
import {IUser} from "./user.interfaces";
import {ChangeUserDto} from "./dto/change-user.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    private users: IUser[] = [
        { id: '1', name: 'Вася' },
        { id: '2', name: 'Петя' },
    ];

    public getUsers(): IUser[] {
        return this.users;
    }

    public getUserById(id: string): IUser {
        return this.users.find(u => u.id === id);
    }

    public createUser({ name }: CreateUserDto): IUser {
        const user = {
            id: (this.users.length + 1).toString(),
            name
        };
        this.users.push(user);
        return user;
    }

    public changeUser({ id, name }: ChangeUserDto): IUser {
        let user: IUser;
        this.users.map(u => {
            if (u.id === id) {
                u.name = name;
                user = u;
            }
        });
        return user;
    }

    public deleteUser(id: string): IUser {
        const user = this.users.find(u => u.id === id);
        this.users = this.users.filter(u => u.id !== id);
        return user;
    }

}
