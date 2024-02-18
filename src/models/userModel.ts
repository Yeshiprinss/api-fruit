import connectionPool from "../data/db"
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "../utils/errors/custom.error";
import { ValidateName } from "../utils/config";

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
  createUser: async (email: string, password:string, name: string, lastName:string, phone:string, rolId: string) => {
    try {
      const find = await ValidateName(email,'user_email', 'Users');
      if (find > 0)  throw CustomError.badRequest('El email del user ya existe');
      
      const newId = uuidv4();
      const [rows] = await connectionPool.query(`INSERT INTO Users (user_id, user_email, user_password, user_name, user_lastname, user_phone, rol_id) VALUES ('${newId}', '${email}', '${password}', '${name}', '${lastName}', '${phone}', '${rolId}')`);
      return rows
    } catch (error) {
      throw error
    }
  },
  updateUser: async (id:string, email: string, password:string, name: string, lastName:string, phone:string, rolId: string) => {
    try {
      const [rows] = await connectionPool.query(`UPDATE Users SET user_name = '${name}' , user_email = '${email}' , user_password = '${password}' , user_lastname = '${lastName}' , user_phone = '${phone}' , rol_id = '${rolId}'  WHERE user_id = '${id}'`);
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
  }
}

export default UserModel;