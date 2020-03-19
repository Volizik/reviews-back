import {Controller, Delete, Get, Param, Put, Post, Body } from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    // @Get('')
    // getAll(): IUser[] {
    //     return this.userService.getUsers();
    // }
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
