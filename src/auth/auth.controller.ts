import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {User} from "../user/user.entity";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<User> {
        return req.user;
    }

    @Post('registration')
    async registration(@Body() body: CreateUserDto): Promise<User> {
        return this.authService.registration(body);
    }
}
