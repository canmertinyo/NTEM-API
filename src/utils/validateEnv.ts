import { cleanEnv, str, port } from 'envalid';

export function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['development', 'production'] }),
        MONGO_PATH: str(),
        PORT: port({ default: 7070 })
    });
}
