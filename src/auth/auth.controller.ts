import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}
    
    //Login Route
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    //Register New User Route
    @Post('/register')
    async register(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('admin_code') adminCode: string
    ) {
        const newUserId = await this.userService.register(username, password, adminCode);
        return newUserId || {message: "User could not be created"}
    }

}