import connectionPool from "../data/db"
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "../utils/errors/custom.error";
import { BcryptAdapter, ValidateName } from "../utils/config";
import { User } from "../interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface"
import { RowDataPacket } from "mysql2";

interface PasswordUser{
  password: string
}

const UserModel = {

  getAllUsers: async () => {
    try {
      const [rows] = await connectionPool.query("SELECT * FROM users where user_status = 1")
      return rows
    } catch (error) {
      throw error
    }
  },
  getUserById: async (id: string) => {
    try {
      const sql = 'SELECT * FROM Users WHERE user_status = ? AND user_id= ?';
      const params = [1, id];
      const [rows] = await connectionPool.query(sql, params);
      return rows
    } catch (error) {
      throw error
    }
  },
  getUserByName: async (name: string) => {
    try {
      const sql = 'SELECT * FROM Users WHERE user_status = ? AND user_name like ?';
      const params = [1, `%${name}%`];
      const [rows] = await connectionPool.query(sql, params);
      return rows
    } catch (error) {
      throw error
    }
  },
  createUser: async ({email, password, name, lastName, phone, isAdmin}: User) => {
    try {
      const find = await ValidateName(email,'user_email', 'Users');
      if (find > 0)  throw CustomError.badRequest('El email del user ya existe');
      
      const newId = uuidv4();
      const passwordHash = BcryptAdapter.hash(password);
      isAdmin = 0
      // console.log(password, passwordHash);
      const [rows] = await connectionPool.query(`INSERT INTO Users (user_id, user_email, user_password, user_name, user_lastname, user_phone, user_is_admin) VALUES ('${newId}', '${email}', '${passwordHash}', '${name}', '${lastName}', '${phone}', ${isAdmin})`);
      return rows
    } catch (error) {
      throw error
    }
  },
  updateUser: async (id:string, {email, password, name, lastName, phone, isAdmin}: User) => {
    try {
      const passwordHash = BcryptAdapter.hash(password);
      const [rows] = await connectionPool.query(`UPDATE Users SET user_name = '${name}' , user_email = '${email}' , user_password = '${passwordHash}' , user_lastname = '${lastName}' , user_phone = '${phone}' , user_is_admin = ${isAdmin} WHERE user_id = '${id}'`);
      return rows
    } catch (error) {
      throw error
    }
  },
  deleteUser: async (id: string) => {
    try {
      const [rows] = await connectionPool.query(`UPDATE Users SET user_status = 0 WHERE user_id = '${id}'`);
      return rows
    } catch (error) {
      throw error
    }
  },
  loginUser: async ({ email, password}: Auth) => {
    try {

      // const find = await ValidateName(email,'user_email', 'Users');
      // if (find === 0)  throw CustomError.badRequest('User no existe');
      const sql = 'SELECT * FROM Users WHERE user_status = ? AND user_email = ?';
      const params = [1, email];
      let [find] = await connectionPool.query<RowDataPacket[]>(sql, params);
      const passwordHash = find[0]?.['user_password'];
      if (find[0].length === 0)  throw CustomError.badRequest('User no existe');

      const isValid = BcryptAdapter.compare(password, passwordHash)
      if(!isValid) throw CustomError.badRequest('Invalid password');

      const [rows] = await connectionPool.query(`SELECT * FROM Users WHERE user_email = '${email}' AND user_password = '${passwordHash}'`);
      return rows
    } catch (error) {
      throw error
    }
  }
}

export default UserModel;