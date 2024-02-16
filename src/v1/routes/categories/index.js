import {Router} from "express";
import CategoriesControllers from '../../../controllers/categories/index.js'

const routeCategories = Router();

routeCategories
.get('/categories',CategoriesControllers.getAllCategories)
.get('/categories/:id', CategoriesControllers.getCategoryById)
// .get('/categories/:name', CategoriesControllers.getCategoryByName)

.post('/categories', CategoriesControllers.createCategory)
.patch('/categories/:id', CategoriesControllers.updateCategory)
.delete('/categories/:id', CategoriesControllers.deleteCategory)

export default routeCategories;