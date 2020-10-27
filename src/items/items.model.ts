import * as mongoose from 'mongoose';

export const LibraryItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    isAvailable: {type: Boolean, required: true}
});

export interface LibraryItem extends mongoose.Document {
    _id: string,
    title: string,
    description: string,
    type: string,
    isAvailable: boolean
}