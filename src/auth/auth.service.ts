import { Injectable } from '@nestjs/common';
import * as config from 'config';
import * as bcrypt from 'bcrypt';
import {User} from "../user/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}
    private saltRounds = config.get('saltRounds');

    async registration(createUserDto: CreateUserDto): Promise<User> {
        const user = createUserDto;
        user.password = await this.hidePassword(user.password);
        return this.userService.createUser(user);
    }

    async login(user: User): Promise<{accessToken: string}> {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userService.getUserWithPassword(email);
        if (user) {
            const isPasswordValid = await this.isPasswordValid(pass, user.password);

            if (isPasswordValid) {
                return user;
            }
        }
        return null;
    }

    private async isPasswordValid(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    private async hidePassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

}
