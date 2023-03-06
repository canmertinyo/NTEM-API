import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUser } from '@/utils/interfaces';

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String },
        role: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);
