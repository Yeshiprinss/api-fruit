import connectionPool from "../data/db"
import { v4 as uuidv4 } from 'uuid';

const ProductModel = {

  getAllProducts: async () => {
    try {
      const [result] = await connectionPool.query("SELECT * FROM products where product_status = 1")
      return result
    } catch (error) {
      throw error
    }
  },
  getProductById: async (id: string) => {
    try {
      const sql = 'SELECT * FROM products WHERE product_status = ? AND product_id= ?';
      const params = [1, id];
      const [result] = await connectionPool.query(sql, params);
      return result
    } catch (error) {
      throw error
    }
  },
  getProductByName: async (name: string) => {
    try {
      const sql = 'SELECT * FROM products WHERE product_status = ? AND product_name like ?';
      const params = [1, `%${name}%`];
      const [result] = await connectionPool.query(sql, params);
      return result
    } catch (error) {
      throw error
    }
  },
  createProduct: async (name: string, description:string, image: string, subCategory: string, stock: number, measurement: string, salesPrice: number, purchasePrice: number) => {
    try {
      const newId = uuidv4();
      const sqlInsert ='INSERT INTO products(product_id, product_name, product_description, product_image, sub_category_id, product_stock, um_id, product_sales_price, product_purchase_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      const params = [newId, name, description, image, subCategory, stock, measurement, salesPrice, purchasePrice];
      const [result] = await connectionPool.query(sqlInsert, params);
      return result
    } catch (error) {
      throw error
    }
  },
  updateProduct: async (id:string, name: string, description:string, image: string, subCategory: string, stock: number, measurement: string, salesPrice: number, purchasePrice: number) => {
    try {
      const [result] = await connectionPool.query(`UPDATE products SET product_name = '${name}' product_description='${description}', product_image='${image}', sub_category_id='${subCategory}', product_stock=${stock}, um_id='${measurement}', product_sales_price=${salesPrice}, product_purchase_price=${purchasePrice} WHERE product_id = '${id}'`);
      return result
    } catch (error) {
      throw error
    }
  },
  deleteProduct: async (id: string) => {
    try {
      const [result] = await connectionPool.query(`UPDATE products SET product_status = 0 WHERE products_id = '${id}'`);
      return result
    } catch (error) {
      throw error
    }
  },
}

export default ProductModel;