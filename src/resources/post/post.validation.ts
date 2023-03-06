import Joi from 'joi';

export const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
});
