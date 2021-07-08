import { IUser } from '@entities/User';
import KnexDB from "../db/knex";

class UserRepository {

    knx: KnexDB;

    constructor(){
        this.knx = new KnexDB();
        this.knx.init(); 
    }

    async getAll(): Promise<IUser[]>{
        return new Promise<IUser[]>( async ( resolve, reject)=>{
            await this.knx.db("test_db")
            .select("*")
            .then((users:IUser[])=>{
                if(users){
                    resolve(users);
                }else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("error in user getAll repo catch: " + e);
                reject(e);
            });
        });
    }

    async getOne(emailParam: string):Promise<IUser>{
        return new Promise<IUser>(async (resolve,reject)=>{
            await this.knx.db("test_db")
            .select("*")
            .where("email", emailParam)
            .first()
            .then((users:IUser)=>{
                if(users){
                    resolve(users);
                }else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("error in user getOne repo catch: " + e);
                reject(e);
            })
        });
    }

    async add(user:IUser):Promise<number>{
        return new Promise<number>(async(resolve,reject)=>{
            await this.knx.db("test_db")
            .insert(user)
            .select("id")
            .then((result:number[])=>{
                if(result){
                    resolve(result[0]);
                }else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("error in user add repo catch: " + e);
                reject(e);
            })
        });
    }

    async update(user:IUser):Promise<number>{
        return new Promise<number>(async(resolve,reject)=>{
            await this.knx.db("test_db")
            .where("id",user.id)
            .update(user)
            .select("id")
            .then((res:number)=>{
                if(res){
                    resolve(res);
                }else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("error in user update repo catch: " + e);
                reject(e);
            })
        });
    }

    async delete(id:number):Promise<number>{
        return new Promise<number>(async(resolve,reject)=>{
            await this.knx.db("test_db")
            .where("id",id)
            .del()
            .select("id")
            .then((res:number)=>{
                if(res){
                    resolve(res);
                }else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("error in user delete repo catch: " + e);
                reject(e);
            })
        });
    }
}

const userRepository = new UserRepository();
export default userRepository;