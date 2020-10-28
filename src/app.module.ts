import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/user.model';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ItemsModule,
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
    MongooseModule.forRoot('mongodb://localhost:27017/cuffe-library')
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
