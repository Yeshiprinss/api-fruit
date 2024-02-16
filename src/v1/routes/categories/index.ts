import {Router} from "express";
import CategoriesControllers from '../../../controllers/categories/index'

const routeCategories = Router();

routeCategories
.get('/categories',CategoriesControllers.getAllCategories)
.get('/categories/:id', CategoriesControllers.getCategoryById)

.post('/categories', CategoriesControllers.createCategory)
.patch('/categories/:id', CategoriesControllers.updateCategory)
.delete('/categories/:id', CategoriesControllers.deleteCategory)

export default routeCategories;