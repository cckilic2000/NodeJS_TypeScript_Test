import User, { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
import userRepository from 'src/repositories/UserRepository';



class UserService {

    public async getOne(email: string): Promise<IUser | null> {
        try {
            const db = await userRepository.getOne(email);    
            if (db && db.email === email) {
                return db;
            }
            return null;
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
            user.id = getRandomInt();
            const done = await userRepository.add(user);
            return done;    
        } catch (error) {
            console.log("Error in UserService add: " + error);
            return -1;    
        }
    }


    public async update(user: IUser): Promise<number> {
        try {
            const db = await userRepository.update(user);
            return db;
        } catch (error) {
            console.log("Error in UserService update: " + error);
            return -2;
        }
        
    }


    public async delete(id: number): Promise<number> {
        try {
            const db = await userRepository.delete(id);
            return db;
        } catch (error) {
            console.log("Error in UserService delete: " + error);
            return -3;
        }
    }
}

const userService = new UserService();
export default userService;
