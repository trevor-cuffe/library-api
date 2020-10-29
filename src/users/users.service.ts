import { Injectable, Scope, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {

    constructor(@InjectModel("User") private readonly userModel: Model<User>) {
        this.resetUserCheckoutLists();
    }

    //Register new user
    async register(username: string, password: string, adminCode?: string): Promise<string | null> {

        //check if username already exists
        if (await this.findByUsername(username)) return null;

        let hash = bcrypt.hashSync(password, 14);
        const newUser = new this.userModel({
            username,
            password: hash
        });

        //Compare admin code and make new user an admin
        //For a deployed app, change this to compare with an environment variable
        if (adminCode && adminCode === "makemeanadmin") newUser.isAdmin = true;

        const result = await newUser.save();
        return result._id;
    }


    //find user by ID
    async findById(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id);
        return user || null;
    }

    //find user by Username
    async findByUsername(username: string): Promise<User | null> {
        const user = await this.userModel.findOne({username: username});
        return user || null;
    }

    //add item to checked out list
    async checkOutItem(userId: string, itemId: string) {
        const user = await this.findById(userId);
        user.checkedOutItems.push(itemId);
        user.save();
    }

    //remove item from checked out list
    async returnItem(userId: string, itemId: string): Promise<Boolean> {
        const user = await this.findById(userId);
        const index = user.checkedOutItems.indexOf(itemId);
        if (index > -1) {
            user.checkedOutItems.splice(index, 1);
            await user.save();
            return true;
        }
        return false;
    }

    //Reset user checked out items
    async resetUserCheckoutLists() {
        const users = await this.userModel.find({});
        users.forEach( async (user: User) => {
            user.checkedOutItems = [];
            user.save();
        })
    }
}
