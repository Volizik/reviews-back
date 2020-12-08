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

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({email});
    }

    async getUserWithPassword(email: string): Promise<User | undefined> {
        return this.usersRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', {email})
            .getOne();
    }

    async getUserById(id: string): Promise<User> {
        return this.usersRepository.findOne({where: {id}})
    }

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
