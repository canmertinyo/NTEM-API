import jwt from 'jsonwebtoken';

import { IUser, IToken } from '@/utils/interfaces';

export const createToken = (user: User): string => {
    const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
    const payload = {
        userId: user._id
    };

    return jwt.sign(payload, jwtSecret, {
        expiresIn: '1d'
    });
};

export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
            if (err) return reject(err);

            return resolve(payload as IToken);
        });
    });
};
