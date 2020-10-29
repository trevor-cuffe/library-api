import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    checkedOutItems: {type: [String], default: []}
});

export interface User extends mongoose.Document {
    _id: string,
    username: string,
    password: string,
    isAdmin: boolean,
    checkedOutItems: string[]
}