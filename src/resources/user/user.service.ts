import { UserModel } from '@/resources/user/user.model';
import { createToken } from '@/utils/token';
import { UserServiceSchema } from '@/utils/interfaces';

export class UserService extends UserServiceSchema {
    constructor() {
        super();
    }
    private user = UserModel;
    /**
     * Register a new user
     */
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
    /**
     * Attempt to login a user
     */
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
            throw new Error('unable to login1');
        }
    }
}
