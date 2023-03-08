import { Request, Response, NextFunction } from 'express';

export abstract class PostControllerSchema {
    protected abstract initialiseRoutes(): void;
    protected abstract create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>;
}
