import connectionPool from "../../data/db.js"
import { v4 as uuidv4 } from 'uuid';

const CategoryModel = {

  getAllCategory: async () => {
    try {
      const [result] = await connectionPool.query("SELECT * FROM categories where categories_status = 1")
      return result
    } catch (error) {
      throw error
    }
  },
  getCategoryById: async (id) => {
    try {
      if(!id) throw new Error("No id provided")
      const sql = 'SELECT * FROM categories WHERE categories_status = ? AND categories_id= ?';
      const params = [1, id];
      const [result] = await connectionPool.query(sql, params);
      console.log(result)
      return result
    } catch (error) {
      throw error
    }
  },
  getCategoryByName: async (name) => {
    try {
      const sql = 'SELECT * FROM categories WHERE categories_status = ? AND categories_name like ?';
      const params = [1, `%${name}%`];
      const [result] = await connectionPool.query(sql, params);
  
      return result
    } catch (error) {
      throw error
    }
  },
  createCategory: async (name) => {
    try {
      const newId = uuidv4();
      if(!name) throw new Error("Name is required")
      const [result] = await connectionPool.query(`INSERT INTO categories (categories_id,categories_name) VALUES ('${newId}','${name}')`);
      return result
    } catch (error) {
      throw error
    }
  },
  updateCategory: async (id, name) => {
    try {
      const [result] = await connectionPool.query(`UPDATE categories SET categories_name = '${name}' WHERE categories_id = '${id}'`);
      return result
    } catch (error) {
      throw error
    }
  },
  deleteCategory: async (id) => {
    try {
      const [result] = await connectionPool.query(`UPDATE categories SET categories_status = 0 WHERE categories_id = '${id}'`);
      return result
    } catch (error) {
      throw error
    }
  },
}

export default CategoryModel;