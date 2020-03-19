import { Injectable } from '@nestjs/common';
import * as config from 'config';
import * as bcrypt from 'bcrypt';
import {User} from "../user/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
    ) {}
    private saltRounds = config.get('saltRounds');

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.userService.findOne(username);
        const isPasswordValid = await this.isPasswordValid(pass, user.password);
        if (user && isPasswordValid) {
            return user;
        }
        return null;
    }

    async registration(createUserDto: CreateUserDto): Promise<User> {
        const user = createUserDto;
        user.password = await this.hidePassword(user.password);
        return this.userService.createUser(user);
    }

    private async isPasswordValid(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    private async hidePassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

}
