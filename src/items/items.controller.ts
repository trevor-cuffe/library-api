import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('catalog')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    //Search Query
    @Get('/search')
    async searchForItem(
        @Query('by') searchBy: string,
        @Query('value') searchValue: string
    ) {
        //convert comma-separated strings to array of strings
        const keys = searchBy?.split(',');
        const values = searchValue?.split(',');

        //if keys or values are not provided, return error message
        if(!keys || !values) return {message: "missing search queries"}

        const queries = this.createSearchQuery(keys, values);

        const searchResults = await this.itemsService.search(queries);
        return searchResults;
    }

    //Create New Item
    @Post()
    async createItem(
        @Body('title') title: string,
        @Body('description') desc: string,
        @Body('type') type: string,
        @Body('isAvailable') isAvailable: boolean
    ) {
        const newItemId = await this.itemsService.createProduct(title, desc, type, isAvailable);
        return {id: newItemId};
    }

    //Index
    @Get()
    async getAllItems() {
        const libraryItems = await this.itemsService.getAllItems();
        return {library_items: libraryItems};
    }

    //Show
    @Get('/:id')
    async getSingleItem(@Param('id') itemId: string) {
        const libraryItem = await this.itemsService.getItemById(itemId);
        return libraryItem;
    }

    //Update
    @Patch('/:id')
    async updateItem(
        @Param('id') itemId: string,
        @Body('title') itemTitle: string,
        @Body('description') itemDesc: string,
        @Body('type') itemType: string
    ) {
        let updatedItem = await this.itemsService.updateItem(itemId, itemTitle, itemDesc, itemType);
        return {
            message: "Successfully Updated",
            updated_item: updatedItem
        };
    }

    //Destroy
    @Delete('/:id')
    async deleteItem(@Param('id') itemId: string) {
        const result = await this.itemsService.deleteItem(itemId);
        return result;
    }


    
    //create a queries object with key-value pairs.
    private createSearchQuery(keys: string[], values: string[]): {} {
        //If a "search by" query is given twice, the last provided value will overwrite previous ones
        const queries = {};
        keys.forEach( (key, i) => {
            //only update key if a matching value exists
            if(values[i]) {
                queries[key] = values[i];
            }
        });

        return queries;
    }
}
