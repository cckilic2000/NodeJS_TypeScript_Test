import { IUser } from '@entities/User';
import userRepository from 'src/repositories/UserRepository';



class UserService {

    public async getOne(email: string): Promise<IUser> {
        try {
            const db = await userRepository.getOne(email);    
            return db;
        } catch (error) {
            console.log("Error in UserService getOne: " + error);
            return error;
        }
    }


    public async getAll(): Promise<IUser[]> {
        try {
            const db = await userRepository.getAll();
            return db;    
        } catch (error) {
            console.log("Error in UserService getAll: " + error);
            return error;
        }
    }


    public async add(user: IUser): Promise<number> {
        try {
            const done = await userRepository.add(user);
            return done;    
        } catch (error) {
            console.log("Error in UserService add: " + error);
            return error;    
        }
    }


    public async update(user: IUser): Promise<number> {
        try {
            const db = await userRepository.update(user);
            return db;
        } catch (error) {
            console.log("Error in UserService update: " + error);
            return error;
        }
        
    }


    public async delete(id: number): Promise<number> {
        try {
            const db = await userRepository.delete(id);
            return db;
        } catch (error) {
            console.log("Error in UserService delete: " + error);
            return error;
        }
    }
}

const userService = new UserService();
export default userService;
