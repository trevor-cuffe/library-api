import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {

    constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

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

}
