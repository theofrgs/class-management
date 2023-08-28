import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from 'src/shemas/user/user.service';
import { HashService } from 'src/tools/services/hash.service';
import { JwtService } from 'src/tools/services/jwt.service';
import { User } from 'src/shemas/user/user.shema';
import { CreateUserDto } from 'src/shemas/user/create-user.shema';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) { }


    async loginNative(body: LoginDto): Promise<Object> {
        const users = await this.userService.findByEmail(body.email);

        if (users.length < 1 || (await this.hashService.equals(body.password, users[0].password)) == false) {
            throw new HttpException({ message: 'The email or the password is incorrect', }, HttpStatus.NOT_FOUND);
        }
        return {
            "message": "User successfully login",
            "data": this.jwtService.create({ userId: (users[0] as User)._id.toString() })
        }
    }

    async registerNative(body: RegisterDTO): Promise<Object> {
        // TODO Add credentials table for Google Auth
        var users = await this.userService.findByEmail(body.email);

        if (users.length > 0) {
            throw new HttpException({ message: 'An user with this email already exists', }, HttpStatus.BAD_REQUEST);
        } else {
            return {
                "message": "User successfully registered",
                "data": this.jwtService.create({ userId: (await this.userService.create(new CreateUserDto(body.email, await this.hashService.hash(body.password))))._id })
            }
        }
    }
}
