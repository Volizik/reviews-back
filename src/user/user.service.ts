import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
    ) {}
    //
    // public getUsers(): IUser[] {
    //     return this.users;
    // }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({username});
    }

    // public getUserById(id: string): IUser {
    //     return this.users.find(u => u.id === id);
    // }

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.usersRepository.createUser(createUserDto);
    }

    // public changeUser({ id, name }: ChangeUserDto): IUser {
    //     let user: IUser;
    //     this.users.map(u => {
    //         if (u.id === id) {
    //             u.name = name;
    //             user = u;
    //         }
    //     });
    //     return user;
    // }
    //
    // public deleteUser(id: string): IUser {
    //     const user = this.users.find(u => u.id === id);
    //     this.users = this.users.filter(u => u.id !== id);
    //     return user;
    // }

}
