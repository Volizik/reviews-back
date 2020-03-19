import {Controller, Delete, Get, Param, Put, Post, Body, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";
import {AuthGuard} from "@nestjs/passport";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    getAll(): Promise<User[]> {
        return this.userService.getUsers();
    }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string): IUser {
    //     return this.userService.getUserById(id);
    // }

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
