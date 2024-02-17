import {Router} from "express";
import ProductsControllers from "../../controllers/productController";

const routeProducts = Router();

routeProducts
.get('/products',ProductsControllers.getAllProducts)
.get('/products/:id', ProductsControllers.getProductById)

.post('/products', ProductsControllers.createProduct)
.patch('/products/:id', ProductsControllers.updateProduct)
.delete('/products/:id', ProductsControllers.deleteProduct)

export default routeProducts;