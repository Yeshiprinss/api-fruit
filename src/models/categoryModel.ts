import connectionPool from "../data/db"
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "../utils/errors/custom.error";
import { ValidateName } from "../utils/config";

const CategoryModel = {

  getAllCategory: async () => {
    try {
      const [rows] = await connectionPool.query("SELECT * FROM categories where categories_status = 1")
      return rows
    } catch (error) {
      throw error
    }
  },
  getCategoryById: async (id: string) => {
    try {
      const sql = 'SELECT * FROM categories WHERE categories_status = ? AND categories_id= ?';
      const params = [1, id];
      const [rows] = await connectionPool.query(sql, params);
      return rows
    } catch (error) {
      throw error
    }
  },
  getCategoryByName: async (name: string) => {
    try {
      const sql = 'SELECT * FROM categories WHERE categories_status = ? AND categories_name like ?';
      const params = [1, `%${name}%`];
      const [rows] = await connectionPool.query(sql, params);
      return rows
    } catch (error) {
      throw error
    }
  },
  createCategory: async (name: string) => {
    try {
      const find = await ValidateName(name,'categories_name', 'categories');
      if (find > 0)  throw CustomError.badRequest('El nombre de la categoria ya existe');
      
      const newId = uuidv4();
      const [rows] = await connectionPool.query(`INSERT INTO categories (categories_id,categories_name) VALUES ('${newId}','${name}')`);
      return rows
    } catch (error) {
      throw error
    }
  },
  updateCategory: async (id:string, name: string) => {
    try {
      const [rows] = await connectionPool.query(`UPDATE categories SET categories_name = '${name}' WHERE categories_id = '${id}'`);
      return rows
    } catch (error) {
      throw error
    }
  },
  deleteCategory: async (id: string) => {
    try {
      const [rows] = await connectionPool.query(`UPDATE categories SET categories_status = 0 WHERE categories_id = '${id}'`);
      return rows
    } catch (error) {
      throw error
    }
  },
}

export default CategoryModel;