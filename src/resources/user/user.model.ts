import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUser } from '@/utils/interfaces';

const UserSchema = new Schema<IUser>(
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

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model('User', UserSchema);
