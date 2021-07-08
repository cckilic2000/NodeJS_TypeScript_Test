import Joi from 'joi';


export const userSchema = {
    add: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        id: Joi.number()
    }),
    update: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        id: Joi.number()
    }),
    delete: Joi.object().keys({
        id: Joi.number().required()
    }),
    getOne: Joi.object().keys({
        email: Joi.string().email().required()
    })
}