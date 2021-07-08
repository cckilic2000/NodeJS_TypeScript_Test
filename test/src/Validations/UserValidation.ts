import Joi from 'joi';

export const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    id: Joi.number()
}).label('Add');

export const updateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    id: Joi.number()
}).label('Update');

export const deleteSchema = Joi.object({
    id: Joi.number().required()
}).label('Delete');

export const getOneSchema = Joi.object({
    email: Joi.string().email().required()
}).label('GetOne');