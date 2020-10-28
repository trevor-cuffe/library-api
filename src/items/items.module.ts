import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "src/users/users.service";
import { UserSchema } from "../users/user.model"
import { ItemsController } from "./items.controller";
import { LibraryItemSchema } from "./items.model";
import { ItemsService } from "./items.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name:"LibraryItem", schema: LibraryItemSchema}]),
        MongooseModule.forFeature([{name: "User", schema: UserSchema}])
    ],
    controllers: [ItemsController],
    providers: [ItemsService, UsersService]
})
export class ItemsModule{}