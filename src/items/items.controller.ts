import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('catalog')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    //Search Query
    @Get('/search')
    searchForItem(
        @Query('by') searchBy: string,
        @Query('value') searchValue: string
    ) {
        //convert comma-separated strings to array of strings
        const keys = searchBy?.split(',');
        const values = searchValue?.split(',');

        //if keys or values are not provided, return error message
        if(!keys || !values) return {message: "missing search queries"}

        const queries = this.createSearchQuery(keys, values);

        return this.itemsService.search(queries);
    }

    //Create New Item
    @Post()
    createItem(
        @Body('title') title: string,
        @Body('description') desc: string,
        @Body('type') type: string,
        @Body('isAvailable') isAvailable: boolean
    ): {id:string} {
        const newItemId = this.itemsService.createProduct(title, desc, type, isAvailable);
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
        @Body('type') itemType: string
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
