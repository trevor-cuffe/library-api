import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && bcrypt.compareSync(pass, user.password)) {
            user.password = undefined;
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}
