import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config({ path: '.env' });

import { Controller } from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';

import { BaseAppController } from './utils/interfaces/app.controller';

export class App extends BaseAppController {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        super();
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    protected initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(compression());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    protected initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    protected initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    protected initialiseDatabaseConnection(): void {
        const mongoDatabaseUri = process.env.MONGO_PATH as string;

        mongoose.set('strictQuery', true);

        mongoose
            .connect(mongoDatabaseUri)
            .then(() => {
                console.log(chalk.green.bold('Connected to database!'));
            })
            .catch((error: unknown) => {
                console.log(chalk.red.bold('Can not connect to database!' + error));
            });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(
                chalk.green.bold('api is up and running on port ' + chalk.blue.bold(this.port))
            );
        });
    }
}
