import { Injectable, NotFoundException } from "@nestjs/common";
import { LibraryItem } from "./items.model";
import { LibraryItemType } from "./itemTypes";
const uniqid = require("uniqid");

@Injectable()
export class ItemsService {
    private items: LibraryItem[] = [];

    //create a new library item
    createProduct(title: string, desc: string, type: LibraryItemType): string {
        //generate a random string for a unique id
        const id: string = uniqid();
        const newItem = new LibraryItem(id, title, desc, type);
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


    //update an item with new values
    updateItem(id: string, title: string, description: string, type: LibraryItemType) {
        const [item, index] = this.findItem(id);
        let updatedItem = {...item}
        if(title) {
            updatedItem.title = title;
        }
        if(description) {
            updatedItem.description = description;
        }
        if(type) {
            updatedItem.type = type;
        }
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