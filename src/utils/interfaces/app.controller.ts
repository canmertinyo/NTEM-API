import { Controller } from '@/utils/interfaces/controller.interface';

/* eslint-disable @typescript-eslint/no-empty-function */
export abstract class BaseAppController {
    constructor() {}

    protected abstract initialiseMiddleware(): void;

    protected abstract initialiseControllers(controllers: Controller[]): void;

    protected abstract initialiseErrorHandling(): void;

    protected abstract initialiseDatabaseConnection(): void;

    public abstract listen(): void;
}
