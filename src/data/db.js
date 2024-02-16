import dotenv from 'dotenv';
import {createPool} from 'mysql2/promise';

dotenv.config();

const {DB_HOST, DB_PASSWORD, DB_USER, DB_NAME} = process.env;

const connectionPool = createPool({
  host    : DB_HOST,
  user    : DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

export default connectionPool;