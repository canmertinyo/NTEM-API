import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    role: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}
