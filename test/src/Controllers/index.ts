import userController from "src/controllers/UserController";
import * as express from "express"

const userRouter = express.Router();
userRouter.get('/all', userController.getAllUsers);
userRouter.post('/add', userController.addOneUser);
userRouter.put('/update', userController.updateOneUser);
userRouter.delete('/delete/:id', userController.deleteOneUser);

const baseRouter = express.Router();
baseRouter.use('/users', userRouter);
export default baseRouter;