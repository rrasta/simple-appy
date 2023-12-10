import mongoose, { Document, Schema } from 'mongoose';

interface IItem extends Document {
    user: string
    title: string
    content: string
    created: Date
    lastModified: Date
}

const ItemSchema: Schema = new Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now,  },
});

export default mongoose.model<IItem>('Item', ItemSchema);
