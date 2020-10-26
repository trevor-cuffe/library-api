import { Injectable, NotFoundException } from "@nestjs/common";
import { LibraryItem } from "./items.model";
import { LibraryItemType } from "./itemTypes";
const uniqid = require("uniqid");

@Injectable()
export class ItemsService {
    private items: LibraryItem[] = [];

    //create a new library item
    createProduct(title: string, desc: string, type: string, isAvailable: boolean = true): string {
        //generate a random string for a unique id
        const id: string = uniqid();
        const newItem = new LibraryItem(id, title, desc, type, isAvailable);
        this.items.push(newItem);
        return id;
    }

    //get all items in the catalog
    getAllItems() {
        return [...this.items];
    }

    //get a single item by id
    getItemById(id: string): LibraryItem {
        const item = this.findItem(id)[0];
        return {...item};
    }

    //search for items with queries
    search(queries: {id?: string, title?: string, description?: string, type?: string, isAvailable?: boolean}) {

        let libraryItems = this.getAllItems();
        
        //match ID
        if (queries.id) libraryItems = libraryItems.filter(item => item.id === queries.id);
        //title contains string
        if (queries.title) libraryItems = libraryItems.filter(item => item.title.toLowerCase().includes(queries.title.toLowerCase()));
        //description contains string
        if (queries.description) libraryItems = libraryItems.filter(item => item.description.toLowerCase().includes(queries.description.toLowerCase()));
        //match type
        if (queries.type) libraryItems = libraryItems.filter(item => item.type == queries.type);
        //check if available
        if (queries.isAvailable) libraryItems = libraryItems.filter(item => item.isAvailable === Boolean(queries.isAvailable));

        return libraryItems;
    }


    //update an item with new values
    updateItem(id: string, title: string, description: string, type: string) {
        const [item, index] = this.findItem(id);
        let updatedItem = {...item}
        if(title) updatedItem.title = title;
        if(description) updatedItem.description = description;
        if(type) updatedItem.type = type;
        this.items[index] = updatedItem;
    }

    //delete item from database
    deleteItem(id: string) {
        const index = this.findItem(id)[1];
        this.items.splice(index, 1);
    }

    private findItem(id: string): [LibraryItem, number] {
        const itemIndex = this.items.findIndex( (item) => item.id === id);
        const foundItem = this.items[itemIndex];

        if(!foundItem) {
            throw new NotFoundException('Could not find library item');
        }
        return [foundItem, itemIndex];

    }
}