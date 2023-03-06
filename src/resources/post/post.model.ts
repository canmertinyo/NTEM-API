import mongoose, { Schema, model } from 'mongoose';

import { IPost } from '@/utils/interfaces';

const PostSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        body: { type: String, required: true }
    },
    { timestamps: true }
);

export const PostModel = mongoose.model<IPost>('Post', PostSchema);
