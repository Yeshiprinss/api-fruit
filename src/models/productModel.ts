import connectionPool from "../data/db"
import { v4 as uuidv4 } from 'uuid';

const ProductModel = {

  getAllProducts: async () => {
    try {
      const [result] = await connectionPool.query("SELECT * FROM categories where categories_status = 1")
      return result
    } catch (error) {
      throw error
    }
  },
  getProductById: async (id: string) => {
    try {
      const sql = 'SELECT * FROM categories WHERE categories_status = ? AND categories_id= ?';
      const params = [1, id];
      const [result] = await connectionPool.query(sql, params);
      return result
    } catch (error) {
      throw error
    }
  },
  getProductByName: async (name: string) => {
    try {
      const sql = 'SELECT * FROM categories WHERE categories_status = ? AND categories_name like ?';
      const params = [1, `%${name}%`];
      const [result] = await connectionPool.query(sql, params);
      return result
    } catch (error) {
      throw error
    }
  },
  createProduct: async (name: string) => {
    try {
      const newId = uuidv4();
      const [result] = await connectionPool.query(`INSERT INTO categories (categories_id,categories_name) VALUES ('${newId}','${name}')`);
      return result
    } catch (error) {
      throw error
    }
  },
  updateProduct: async (id:string, name: string) => {
    try {
      const [result] = await connectionPool.query(`UPDATE categories SET categories_name = '${name}' WHERE categories_id = '${id}'`);
      return result
    } catch (error) {
      throw error
    }
  },
  deleteProduct: async (id: string) => {
    try {
      const [result] = await connectionPool.query(`UPDATE categories SET categories_status = 0 WHERE categories_id = '${id}'`);
      return result
    } catch (error) {
      throw error
    }
  },
}

export default ProductModel;