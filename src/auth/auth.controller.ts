import {Body, Controller, HttpCode, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {User} from "../user/user.entity";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    async login(@Request() req): Promise<{accessToken: string}> {
        return this.authService.login(req.user);
    }

    @Post('registration')
    async registration(@Body() body: CreateUserDto): Promise<User> {
        return this.authService.registration(body);
    }
}
