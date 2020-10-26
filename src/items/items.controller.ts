import { Body, Controller, Get, Header, Param, Patch, Post } from '@nestjs/common';
import { LibraryItem } from './items.model';
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

    //Index
    @Get()
    getAllItems() {
        return {library_items: this.itemsService.getAllItems()};
    }

    //Show
    @Get('/:id')
    getSingleItem(@Param('id') itemId: string) {
        return this.itemsService.getItemById(itemId);
    }

    //Patch
    @Patch('/:id')
    updateItem(
        @Param('id') itemId: string,
        @Body('title') itemTitle: string,
        @Body('description') itemDesc: string,
        @Body('type') itemType: string
    ) {
        this.itemsService.updateItem(itemId, itemTitle, itemDesc, itemType);
        return null;
    }


}
