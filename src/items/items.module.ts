import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ItemsController } from "./items.controller";
import { LibraryItemSchema } from "./items.model";
import { ItemsService } from "./items.service";

@Module({
    imports: [MongooseModule.forFeature([{name:"LibraryItem", schema: LibraryItemSchema}])],
    controllers: [ItemsController],
    providers: [ItemsService]
})
export class ItemsModule{}