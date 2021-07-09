import { IUser } from '@entities/User';
import userRepository from 'src/repositories/UserRepository';



class UserService {
    public async getOne(email: string): Promise<IUser>{
        return new Promise<IUser>( async (resolve,reject)=>{
            await userRepository.getOne(email)
            .then((user:IUser)=>{
                resolve(user);
            })
            .catch((e:Error)=>{
                console.log("Error in UserService getOne: " + e);
                reject(e);
            })
        });
    }

    public async getAll(): Promise<IUser[]>{
        return new Promise<IUser[]>( async (resolve,reject)=>{
            await userRepository.getAll()
            .then((users:IUser[])=>{
                resolve(users);
            })
            .catch((e:Error)=>{
                console.log("Error in UserService getAll: " + e);
                reject(e);
            });
        });
    }

    public async add(user:IUser): Promise<number>{
        return new Promise<number>(async (resolve,reject)=>{
            await userRepository.add(user)
            .then((result:number)=>{
                resolve(result);
            })
            .catch((e:Error)=>{
                console.log("Error in UserService add: " + e);
                reject(e);
            });
        });
    }

    public async update(user:IUser):Promise<number>{
        return new Promise<number>( async (resolve,reject)=>{
            await userRepository.update(user)
            .then((result:number)=>{
                resolve(result);
            })
            .catch((e:Error)=>{
                console.log("Error in UserService update: " + e);
                reject(e);
            });
        });
    }

    public async delete(id: number): Promise<number>{
        return new Promise<number>( async (resolve,reject)=>{
            await userRepository.delete(id)
            .then((result:number)=>{
                resolve(result);
            })
            .catch((e:Error)=>{
                console.log("Error in UserService delete: " + e);
                reject(e);
            });
        })
    }
}

const userService = new UserService();
export default userService;
