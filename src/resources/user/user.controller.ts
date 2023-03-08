import { Router, Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';

import { Controller } from '@/utils/interfaces';
import { HttpException } from '@/utils/exceptions/http.exception';
import { register, login } from '@/resources/user';
import { validationMiddleware, authenticatedMiddleware } from '@/middleware/index';
import { UserControllerSchema } from '@/utils/interfaces/user.controller.schema';

import { UserService } from './user.service';

class UserController extends UserControllerSchema implements Controller {
    public path = '/users';
    public router = Router();

    private UserService = new UserService();

    constructor() {
        super();
        this.initialiseRoutes();
    }

    protected initialiseRoutes(): void {
        this.router.post(`${this.path}/register`, validationMiddleware(register), this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(login), this.login);
        this.router.get(`${this.path}`, authenticatedMiddleware, this.getUser);
    }

    protected register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const token = this.UserService.register(name, email, password, 'user');
            return res.status(StatusCodes.CREATED).json({ token });
        } catch (error: any) {
            next(new HttpException(StatusCodes.BAD_REQUEST, error.message));
        }
    };

    protected login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.UserService.login(email, password);

            res.status(StatusCodes.OK).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    protected getUser = (req: Request, res: Response, next: NextFunction): Response | void => {
        if (!req.user) {
            return next(new HttpException(StatusCodes.NOT_FOUND, 'no logged in user '));
        }

        res.status(StatusCodes.OK).json({});
        next();
    };
}

export default UserController;
