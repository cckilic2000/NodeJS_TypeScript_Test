import * as express from "express"
import userService from "src/services/UserService"

import StatusCodes from 'http-status-codes';
import { userSchema } from "src/validations/UserValidation";
import Joi from "joi";
import { IUser } from "@entities/User";
const { CREATED, OK } = StatusCodes;


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
            console.log("Get All Error: " + err);
            next(err);
        })
    }

    getOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const email = req.body;
        
        userSchema.getOne.validateAsync(email).then((result:string)=>{
            userService.getOne(result)
            .then((result)=>{
                return res.status(OK).json({result}).end();
            }).catch((err)=>{
                next(err);
            })
        }).catch((err:Joi.ValidationError)=>{
            console.log("Get One User Error: " + err);
            next(err);
        })
    }

    addOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const { user } = req.body;

        userSchema.add.validateAsync(user).then((result:IUser)=>{
            userService.add(result)
            .then((result)=>{
                return res.status(CREATED).end();
            }).catch((err)=>{
                next(err);
            })
        }).catch((err: Joi.ValidationError)=>{
            console.log("User Addition Error: " + err);
            next(err);
        })
    }

    updateOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const { user } = req.body;

        userSchema.update.validateAsync(user).then((result:IUser)=>{
            user.id = Number(user.id);
            userService.update(result)
            .then((result)=>{
                return res.status(OK).end();
            }).catch((err)=>{
                next(err);
            })
        }).catch((err: Joi.ValidationError)=>{
            console.log("User Update Error: " + err);
            next(err);
        })
    }

    deleteOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const id = req.body;

        userSchema.delete.validateAsync(id).then((result:number)=>{
            userService.delete(Number(id))
            .then((result)=>{
                return res.status(OK).end();
            }).catch((err)=>{
                next(err);
            })
        }).catch((err: Joi.ValidationError)=>{
            console.log("User Delete Error: " + err);
            next(err);
        })
    }
}
const userController = new UserController();
export default userController;