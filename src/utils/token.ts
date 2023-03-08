import jwt from 'jsonwebtoken';

import { IUser, IToken } from '@/utils/interfaces';

export const createToken = (user: IUser): string => {
    const jwtSecret = process.env.JWT_SECRET as jwt.Secret;

    return jwt.sign({ id: user._id }, jwtSecret, {
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
