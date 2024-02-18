import connectionPool from "../data/db"
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "../utils/errors/custom.error";
import { ValidateName } from "../utils/config";

const RolModel = {

  getAllRoles: async () => {
    try {
      const [rows] = await connectionPool.query("SELECT * FROM roles where rol_status = 1")
      return rows
    } catch (error) {
      throw error
    }
  },
  getRolById: async (id: string) => {
    try {
      const sql = 'SELECT * FROM roles WHERE rol_status = ? AND rol_id= ?';
      const params = [1, id];
      const [rows] = await connectionPool.query(sql, params);
      return rows
    } catch (error) {
      throw error
    }
  },
  getRolByName: async (name: string) => {
    try {
      const sql = 'SELECT * FROM roles WHERE rol_status = ? AND rol_description like ?';
      const params = [1, `%${name}%`];
      const [rows] = await connectionPool.query(sql, params);
      return rows
    } catch (error) {
      throw error
    }
  },
  createRol: async (name: string) => {
    try {
      const find = await ValidateName(name,'rol_description', 'roles');
      if (find > 0)  throw CustomError.badRequest('El nombre del rol ya existe');
      
      const newId = uuidv4();
      const [rows] = await connectionPool.query(`INSERT INTO roles (rol_id,rol_description) VALUES ('${newId}','${name}')`);
      return rows
    } catch (error) {
      throw error
    }
  },
  updateRol: async (id:string, name: string) => {
    try {
      const [rows] = await connectionPool.query(`UPDATE roles SET rol_description = '${name}' WHERE rol_id = '${id}'`);
      return rows
    } catch (error) {
      throw error
    }
  },
  deleteRol: async (id: string) => {
    try {
      const [rows] = await connectionPool.query(`UPDATE roles SET rol_status = 0 WHERE rol_id = '${id}'`);
      return rows
    } catch (error) {
      throw error
    }
  },
}

export default RolModel;