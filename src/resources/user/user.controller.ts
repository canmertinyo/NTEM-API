import { Router, Request, Response, NextFunction } from 'express';

import { Controller } from '@/utils/interfaces';
import { HttpException } from '@/utils/exceptions/http.exception';
import { validationMiddleware } from '@/middleware/validation.middleware';
import { register, login } from '@/resources/user/user.validation';
import authenticated from '@/middleware/authenticated.middleware';

import { UserService } from './user.service';

class UserController implements Controller {
    public path = '/users';
    public router = Router();

    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}/register`, validationMiddleware(register), this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(login), this.login);
        this.router.get(`${this.path}`, authenticated, this.getUser);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const token = this.UserService.register(name, email, password, 'user');
            return res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.UserService.login(email, password);

            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUser = (req: Request, res: Response, next: NextFunction): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'no logged in user '));
        }

        res.status(200).json({ user: req.body });
        next();
    };
}

export default UserController;
