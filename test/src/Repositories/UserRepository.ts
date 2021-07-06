import jsonfile from 'jsonfile';
import User, { IUser } from '@entities/User';
import pool from "@db/pool"
import { PoolClient } from 'pg';
import KnexDB from "../db/knex"
import { resolve } from 'path/posix';
import { rejects } from 'assert/strict';
import { isBuffer } from 'util';



class IDatabase {
    users: IUser[];

    constructor(){
        this.users = [];
    }
}


class UserRepository {

    //private readonly dbFilePath: any;


    //constructor(){
        //this.dbFilePath = 'src/daos/MockDb/MockDb.json';
        //this.dbConnect();
    //}


    //private dbConnect() {
    //    pool.connect(function (err, client, done) {
    //        if (err) console.log("db connection error in dbConnect()");
    //        console.log("Connected");
    //      }); 
    //}

    //public openDb(): Promise<IDatabase> {
    //    try {
    //        return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;    
    //    } catch (error) {
    //        console.log("Error in openDb:" + error);
    //        return error;
    //    }
    //}


    //public saveDb(db: IDatabase): Promise<void> {
    //    try {
    //        return jsonfile.writeFile(this.dbFilePath, db);
    //    } catch (error) {
    //        console.log("Error in saveDb: "+ error);
    //        return error;
    //    }
    //}

    //public knx: typeof KnexDB;

    knx: KnexDB;

    constructor(){
        this.knx = new KnexDB();
        this.knx.init(); 
    }

    async getAll(): Promise<IDatabase>{
        return new Promise<IDatabase>( async ( resolve, reject)=>{
            await this.knx.db("test_db")
            .select("*")
            .then((users)=>{
                if(users){
                    const resArr:IDatabase = new IDatabase();
                    users.forEach(element => {
                        const userTemp:User = new User(element.name, element.email, element.id);
                        resArr.users.push(userTemp); 
                    });
                    resolve(resArr);
                }else{
                    console.log("error in user getOne repo then: ");
                    reject();
                }
            })
            .catch((e:Error)=>{
                console.log("error in user getAll repo catch: " + e);
                reject(e);
            });
        });
    }

    async getOne(emailParam: string):Promise<IUser|null>{
        return new Promise<IUser>(async (resolve,reject)=>{
            await this.knx.db("test_db")
            .select("*")
            .then((users)=>{
                if(users){
                    users.forEach(element => {
                        if(element.email === emailParam){
                            const userRes:User = new User(element.name,element.email,element.id);
                            resolve(userRes);
                        }
                    });
                }else{
                    console.log("error in user getOne repo then: ");
                    reject();
                }
            })
            .catch((e:Error)=>{
                console.log("error in user getOne repo catch: " + e);
                reject(e);
            })
        });
    }

    async add(user:IUser):Promise<boolean>{
        return new Promise<boolean>(async(resolve,reject)=>{
            await this.knx.db("test_db")
            .insert({name:user.name,email:user.email,id:user.id})
            .then(()=>{
                resolve(true);
            })
            .catch((e:Error)=>{
                console.log("error in user add repo catch: " + e);
                reject(e);
            })
        });
    }

    async update(user:IUser):Promise<boolean>{
        return new Promise<boolean>(async(resolve,reject)=>{
            await this.knx.db("test_db")
            .where(user.id)
            .update({name:user.name, email:user.email})
            .then(()=>{
                resolve(true);
            })
            .catch((e:Error)=>{
                console.log("error in user update repo catch: " + e);
                reject(e);
            })
        });
    }

    async delete(id:number):Promise<boolean>{
        return new Promise<boolean>(async(resolve,reject)=>{
            await this.knx.db("test_db")
            .where(id)
            .delete()
            .then(()=>{
                resolve(true);
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