import * as express from "express"
import userService from "@Services/UserService"

import StatusCodes from 'http-status-codes';
import { UserSchema } from "src/Validations/UserValidation";
import Joi, { ValidationError } from "joi";
import { IUser } from "@entities/User";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


class UserController{
    //userService: UserService;
    router: express.Router;

    constructor(){
        //this.userService = new UserService();
        this.router = express.Router();
        //this.initializeControllers();
    }

    getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction){
        //const users1 = req.body;
        
        //validasyon*******
        console.log("getAllUsers girildi-----------------------------------");
        const userList = userService.getAll();
        userList.then(result=>{
            console.log("----------------------"+result[0].id +"///"+ result[1].id +"///"+ result[2].id+"----------------------");
            console.log("----------------------"+result[0].name +"///"+ result[1].name +"///"+ result[2].name+"----------------------");
            console.log("----------------------"+result[0].email +"///"+ result[1].email +"///"+ result[2].email+"----------------------");            
            //return res.send(result);
            return res.status(OK).json({result}).end();    
        }).catch((err)=>{
            next(err);
        })

        //UserListSchema.validateAsync(users).then((result:IUser[])=>{
        //    return res.status(OK).json({result});
        //}).catch((err: Joi.ValidationError)=>{
        //    console.log("Get All Users Error" + err);
        //    next(err);
        //})
    }

    addOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const { user } = req.body;
        
        //programin kendi validasyonu
        //if (!user) {
        //    return res.status(BAD_REQUEST).json({
        //        error: paramMissingError,
        //    });
        //}

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

        //await this.userService.add(user);
        //return res.status(CREATED).end();
    }

    updateOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const { user } = req.body;

        //programin kendi validasyonu
        //if (!user) {
        //    return res.status(BAD_REQUEST).json({
        //        error: paramMissingError,
        //    });
        //}

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

        //user.id = Number(user.id);
        //await this.userService.update(user);
        //return res.status(OK).end();
    }

    deleteOneUser(req: express.Request, res: express.Response, next: express.NextFunction){
        const { id } = req.params;
        //delete fonksiyonunun icinde aranan yoksa uyarı geliyor
        if(!id){
            return res.status(BAD_REQUEST).end();
        }
        userService.delete(Number(id));
        return res.status(OK).end();
    }

    //initializeControllers(){
    //    this.router.get('/all', this.getAllUsers);
    //    this.router.post('/add', this.addOneUser);
    //    this.router.put('/update', this.updateOneUser);
    //    this.router.delete('/delete/:id', this.deleteOneUser);
    //}
}
const userController = new UserController();
export default userController;

//const middleRouter = userController.router;
//const userControllerRouter = express.Router();
//userControllerRouter.use( '/UserController', middleRouter);

//const userRouter = userController.router;
//const baseRouter = express.Router();
//baseRouter.use('/users', userRouter);
//export default baseRouter;