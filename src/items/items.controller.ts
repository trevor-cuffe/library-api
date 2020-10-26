import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('catalog')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    //Create New Item
    @Post()
    createItem(
        @Body('title') title: string,
        @Body('description') desc: string,
        @Body('type') type: string,
    ): {id:string} {
        const newItemId = this.itemsService.createProduct(title, desc, type);
        return {id: newItemId};
    }

}
