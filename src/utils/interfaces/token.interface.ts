import { Schema } from 'mongoose';

export interface IToken extends Object {
    id: Schema.Types.ObjectId;
    expiresIn: number;
}
