import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser({password, username, email}: CreateUserDto): Promise<User> {
        const user = new User();

        user.username = username;
        user.email = email;
        user.password = password;

        try {
            await user.save();
            delete user.password;
            return user;
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

}