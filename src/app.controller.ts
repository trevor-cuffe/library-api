import { Controller, Get, Request, Header, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  @Header('Content-Type', 'text/html')
  loadLandingPage(): string {
    return this.appService.landingPage();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
      const user = await this.usersService.findById(req.user._id);
      user.password = undefined;
      return user;
  }

}
