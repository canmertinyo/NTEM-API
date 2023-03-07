import { UserModel } from '@/resources/user/user.model';
import { IUser } from '@/utils/interfaces';
import { createToken, verifyToken } from '@/utils/token';

export class UserService {
    private user = UserModel;

    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<Error | string> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role
            });

            const accessToken = createToken(user);

            return accessToken;
        } catch (error: any) {
            return new Error(error);
        }
    }

    public async login(email: string, password: string): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email !');
            }

            if (await user.isValidPassword(password)) {
                return createToken(user);
            } else {
                throw new Error('Wrong user input!');
            }
        } catch (error) {
            throw new Error('unable to login');
        }
    }
}
