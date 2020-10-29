import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ItemsModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/cuffe-library'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
