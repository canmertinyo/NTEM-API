import { Document } from 'mongoose';
export interface IPost extends Document {
    title: { type: string; required: true };
    body: { type: string; required: true };
}
