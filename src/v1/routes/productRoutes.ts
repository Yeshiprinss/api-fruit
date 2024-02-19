import {Router} from "express";
import ProductsControllers from "../../controllers/productController";
import multer from 'multer';

const upload = multer ({dest: 'uploads'})
const routeProducts = Router();

routeProducts
.get('/products',ProductsControllers.getAllProducts)
.get('/products/:id', ProductsControllers.getProductById)

.post('/products', upload.single('imgProduct'), ProductsControllers.createProduct) // Subir una sola imágen
// .post('/products', upload.array('imgProduct'), ProductsControllers.createProduct) // Subir más de 1 imágen cosultar https://www.npmjs.com/package/multer
.patch('/products/:id', upload.single('imgProduct'), ProductsControllers.updateProduct)
.delete('/products/:id', ProductsControllers.deleteProduct)

export default routeProducts;