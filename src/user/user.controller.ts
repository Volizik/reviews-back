import {Controller, Delete, Get, Param, Put, Post, Body, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    getAll(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUserInfo(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    findOne(@GetUser() user: User): Promise<User> {
        return this.userService.findOne(user.email);
    }

    @Post('')
    create(@Body() body: CreateUserDto): Promise<User> {
        return this.userService.createUser(body);
    }

    // @Put(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() body: ChangeUserDto
    // ): IUser {
    //     return this.userService.changeUser({ id, ...body });
    // }
    //
    // @Delete(':id')
    // delete(@Param('id') id: string): IUser {
    //     return this.userService.deleteUser(id);
    // }

}
