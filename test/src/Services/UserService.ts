import User, { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
import userRepository from '@Repositories/UserRepository';



class UserService {

    //repo: UserRepository;

    //constructor(){
        //this.repo = new UserRepository();
    //}

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
            console.log();
            return db.users;    
        } catch (error) {
            console.log("Error in UserService getAll: " + error);
            return error;
        }
        //return db.users;
    }


    public async add(user: IUser): Promise<boolean> {
        try {
            //const db = await userRepository.openDb();
            user.id = getRandomInt();
            //db.users.push(user);
            //await userRepository.saveDb(db);
            const done = await userRepository.add(user);
            return done;    
        } catch (error) {
            console.log("Error in UserService add: " + error);
            return false;    
        }
    }


    public async update(user: IUser): Promise<boolean> {
        try {
            const db = await userRepository.update(user);
            //for (let i = 0; i < db.users.length; i++) {
            //    if (db.users[i].id === user.id) {
            //        db.users[i] = user;
            //        await userRepository.saveDb(db);
            //        return;
            //    }
            //}
            return db;
        } catch (error) {
            console.log("Error in UserService update: " + error);
            return false;
        }
        
    }


    public async delete(id: number): Promise<boolean> {
        try {
            const db = await userRepository.delete(id);
            //for (let i = 0; i < db.users.length; i++) {
            //    if (db.users[i].id === id) {
            //        db.users.splice(i, 1);
            //        await userRepository.saveDb(db);
            //        return;
            //    }
            //}
            //throw new Error('User not found');
            return db;
        } catch (error) {
            console.log("Error in UserService delete: " + error);
            return false;
        }
    }
}

const userService = new UserService();
export default userService;
