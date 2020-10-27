import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && bcrypt.compareSync(pass, user.password)) {
            return {message: `logged in as ${username}`};
        }
        return null;
    }
}
