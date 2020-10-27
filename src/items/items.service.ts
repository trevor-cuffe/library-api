import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LibraryItem } from "./items.model";
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {

    constructor(@InjectModel("LibraryItem") private readonly libraryItemModel: Model<LibraryItem>) {}

    //create a new library item
    async createProduct(title: string, desc: string, type: string, isAvailable: boolean = true) {

        const newItem = new this.libraryItemModel({
            title,
            description: desc,
            type,
            isAvailable
        });
        const result = await newItem.save();
        return result._id;
    }

    //get all items in the catalog
    async getAllItems() {
        const items = await this.libraryItemModel.find().exec();
        return items as LibraryItem[];
    }

    //get a single item by id
    async getItemById(id: string): Promise<LibraryItem> {
        const item = await this.findItem(id);
        return item;
    }

    //search for items with queries
    async search(queries: {id?: string, title?: string, description?: string, type?: string, isAvailable?: string}) {
        let libraryItems = await this.getAllItems();

        //match ID
        if (queries.id) libraryItems = libraryItems.filter(item => item._id === queries.id);
        //title contains string
        if (queries.title) libraryItems = libraryItems.filter(item => item.title.toLowerCase().includes(queries.title.toLowerCase()));
        //description contains string
        if (queries.description) libraryItems = libraryItems.filter(item => item.description.toLowerCase().includes(queries.description.toLowerCase()));
        //match type
        if (queries.type) libraryItems = libraryItems.filter(item => item.type == queries.type);
        //check if available
        
        if (queries.isAvailable !== undefined) libraryItems = libraryItems.filter(item => String(item.isAvailable) == queries.isAvailable);

        return libraryItems;
        
    }


    //update an item with new values
    async updateItem(id: string, title: string, description: string, type: string): Promise<LibraryItem> {
        const updatedItem = await this.findItem(id);
        if(title) updatedItem.title = title;
        if(description) updatedItem.description = description;
        if(type) updatedItem.type = type;
        updatedItem.save();
        return updatedItem;
    }

    //delete item from database
    async deleteItem(id: string) {
        const result = await this.libraryItemModel.deleteOne({_id: id});
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find product.');
        } else {
            return {message: "Successfully deleted"};
        }
    }

    private async findItem(id: string): Promise<LibraryItem> {
        let item;
        try {
            item = await this.libraryItemModel.findById(id);
        } catch (error) {
            throw new NotFoundException('could not find library item');
        }
        if(!item) {
            throw new NotFoundException('Could not find library item');
        }
        return item;
    }
}