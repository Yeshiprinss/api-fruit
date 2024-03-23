import dotenv from 'dotenv';
import {createPool} from 'mysql2/promise';

dotenv.config();

const {DB_HOST, DB_PASSWORD, DB_USER, DB_NAME,DB_NAME_TEST, NODE_ENV} = process.env;
console.log(NODE_ENV);


const connectionPool = createPool({
  host    : DB_HOST,
  user    : DB_USER,
  password: DB_PASSWORD,
  database: (NODE_ENV === 'development') ? DB_NAME : DB_NAME_TEST,
});

export default connectionPool;