import 'dotenv/config';
import 'module-alias/register';
import chalk from 'chalk';

import { validateEnv } from '@/utils/validateEnv';

import { App } from './app';
import { PostController } from './resources/post/post.controller';
import UserController from './resources/user/user.controller';

validateEnv();

if ((process.env.NODE_ENV as string) !== 'development') {
    throw new Error(chalk.whiteBright.bgRed.bold('You are in PRODUCTION mode!'));
}
const app = new App([new PostController(), new UserController()], Number(process.env.PORT));

app.listen();
