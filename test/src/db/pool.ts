import{Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Cihan2000',
    database: 'postgres',
    port: 5432
})

export default pool;