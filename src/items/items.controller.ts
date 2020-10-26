import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query } from '@nestjs/common';
import { LibraryItem } from './items.model';
import { ItemsService } from './items.service';
import { LibraryItemType } from './itemTypes';

@Controller('catalog')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    //Search Query
    @Get('/search')
    searchForItem(
        @Query('by') searchBy: string,
        @Query('value') searchValue: string
    ) {
        const keys = searchBy.split(',');
        const values = searchValue.split(',');
        const queries = {};
        keys.forEach( (key, i) => queries[key] = values[i]);

        return this.itemsService.search(queries);
    }

    //Create New Item
    @Post()
    createItem(
        @Body('title') title: string,
        @Body('description') desc: string,
        @Body('type') type: LibraryItemType,
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

    //Update
    @Patch('/:id')
    updateItem(
        @Param('id') itemId: string,
        @Body('title') itemTitle: string,
        @Body('description') itemDesc: string,
        @Body('type') itemType: LibraryItemType
    ) {
        this.itemsService.updateItem(itemId, itemTitle, itemDesc, itemType);
        return null;
    }

    //Destroy
    @Delete('/:id')
    deleteItem(@Param('id') itemId: string) {
        this.itemsService.deleteItem(itemId);
        return null;
    }


}
