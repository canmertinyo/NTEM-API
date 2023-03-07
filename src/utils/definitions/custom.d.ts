import { IUser } from '@/utils/interfaces';

declare global {
    namespace Express {
        export interface Request {
            user: IUser;
        }
    }
}
