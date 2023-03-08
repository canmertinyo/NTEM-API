import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';

export function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };

        try {
            const value = await schema.validateAsync(req.body, validationOptions);
            req.body = value;
            next();
        } catch (error: any) {
            const errors: string[] = [];
            error.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(StatusCodes.BAD_REQUEST).send({ errors });
        }
    };
}
