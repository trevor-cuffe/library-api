import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  landingPage(): string {
    return "Welcome to Trevor's Library Service";
  }
}
