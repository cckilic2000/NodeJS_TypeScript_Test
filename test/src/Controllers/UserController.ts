import * as express from "express"
import userService from "src/services/UserService"

import StatusCodes from 'http-status-codes';
import { UserSchema } from "src/validations/UserValidation";
import Joi, { ValidationError } from "joi";
import { IUser } from "@entities/User";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


class UserController{
    router: express.Router;

    constructor(){
        this.router = express.Router();
    }

    getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction){
        const userList = userService.getAll();

        userList.then(result=>{
            result.forEach(element => {
               console.log("name: " + element.name + " /// email: " + element.email + " /// id: " + element.id); 
            });
            return res.status(OK).json({result}).end();    
        }).catch((err)=>{
            next(err);
        })
    }

    addOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const { user } = req.body;

        UserSchema.validateAsync(user).then((result:IUser)=>{
            userService.add(result)
            .then((result)=>{
                return res.status(CREATED).end();
            }).catch((err)=>{
                next(err);
            })
        }).catch((err: Joi.ValidationError)=>{
            console.log("User Addition Error" + err);
            next(err);
        })
    }

    updateOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const { user } = req.body;

        UserSchema.validateAsync(user).then((result:IUser)=>{
            user.id = Number(user.id);
            userService.update(result)
            .then((result)=>{
                return res.status(OK).end();
            }).catch((err)=>{
                next(err);
            })
        }).catch((err: Joi.ValidationError)=>{
            console.log("User Update Error" + err);
            next(err);
        })
    }

    deleteOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const { id } = req.params;

        if(!id){
            return res.status(BAD_REQUEST).end();
        }
        userService.delete(Number(id));
        return res.status(OK).end();
    }
}
const userController = new UserController();
export default userController;