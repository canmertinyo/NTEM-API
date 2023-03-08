export abstract class UserServiceSchema {
    protected abstract register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<Error | string>;

    protected abstract login(email: string, password: string): Promise<string | Error>;
}
