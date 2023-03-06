import { Router, Request, Response, NextFunction } from 'express';

import { Controller } from '@/utils/interfaces';
import { HttpException } from '@/utils/exceptions/http.exception';
import { validationMiddleware } from '@/middleware/validation.middleware';
import { create } from '@/resources/post/post.validation';
import { PostService } from '@/resources/post/post.service';

export class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    protected initialiseRoutes(): void {
        this.router.post(`${this.path}`, validationMiddleware(create), this.create);
    }

    protected create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;

            const post = await this.PostService.create(title, body);

            res.status(201).json({ post });
        } catch (error) {
            next(new HttpException(400, 'cannot create post'));
        }
    };
}
