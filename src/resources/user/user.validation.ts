import Joi from 'joi';

export const register = Joi.object({
    name: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required()
});

export const login = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required()
});
