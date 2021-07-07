import IUser from '@entities/User';
import Joi from 'joi';

export const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    id: Joi.number()
}).label('User');

//export type User = IUser;


