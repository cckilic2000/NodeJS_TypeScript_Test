import Knex from "knex";

export default class KnexDB{
    db!: Knex;
    private initialized!: boolean;
    private knexConfig: Knex.Config;

    constructor(){
        this.knexConfig = {};
    }

    init(): Promise<boolean>{
        return new Promise(async (resolve, reject)=>{
            if(this.initialized = true){
                resolve(true);
            }
            this.knexConfig = {
                client: "pg",
                connection: process.env.POSTGRES_URL,
                pool:{
                    min:1,
                    max:3
                }
            };
            this.db = Knex(this.knexConfig);
            const resultx = this.db.raw("select 1=1");

            this.initialized = true;
            resolve(true);
        })
    }
}

//const KnexDB = new Knex();