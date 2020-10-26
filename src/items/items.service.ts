import { Injectable, NotFoundException } from "@nestjs/common";
import { LibraryItem } from "./items.model";
const uniqid = require("uniqid");

@Injectable()
export class ItemsService {
    private items: LibraryItem[] = [];

    createProduct(title: string, desc: string, type: string): string {
        const id: string = uniqid();
        const newItem = new LibraryItem(id, title, desc, type);
        this.items.push(newItem);
        return id;
    }
}