import { Injectable } from '@nestjs/common';
import {User} from "./user.interfaces";
import {ChangeUserDto} from "./dto/change-user.dto";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserService {

    private users: User[] = [
        { id: '1', name: 'Вася' },
        { id: '2', name: 'Петя' },
    ];

    public getUsers(): User[] {
        return this.users;
    }

    public getUserById(id: string): User {
        return this.users.find(u => u.id === id);
    }

    public createUser({ name }: CreateUserDto): User {
        const user = {
            id: (this.users.length + 1).toString(),
            name
        };
        this.users.push(user);
        return user;
    }

    public changeUser({ id, name }: ChangeUserDto): User {
        let user: User;
        this.users.map(u => {
            if (u.id === id) {
                u.name = name;
                user = u;
            }
        });
        return user;
    }

    public deleteUser(id: string): User {
        const user = this.users.find(u => u.id === id);
        this.users = this.users.filter(u => u.id !== id);
        return user;
    }

}
