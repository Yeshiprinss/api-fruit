import { Request, Response } from "express"
import CategoryModel from "../../models/categories/index"
import { CustomError } from "../../utils/errors/custom.error";

const handlerError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  console.log(error);
  return res.status(500).json({ error: "Internal Server Error" });
};

const CategoriesControllers = {
  getAllCategories: async (req:Request, res:Response) => {
    try {
      const name: string = req.query.name as string
      if (name) 
      {
        const categoryByName = await CategoryModel.getCategoryByName(name)
        res.send(categoryByName)
      }
      else{
        const allCategories = await CategoryModel.getAllCategory()
        res.send(allCategories)
        return; 
      }
    } catch (error) {
      handlerError(error, res)
    }
  },
  getCategoryById: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw new Error("No id provided")
      const category = await CategoryModel.getCategoryById(req.params.id)
      res.send(category)
    } catch (error) {
      throw error
    }
  },
  createCategory: async (req:Request, res:Response) => {
    try {
      const category = await CategoryModel.createCategory(req.body.name)
      res.send(category)
    } catch (error) {
      throw error
    }
  },
  updateCategory: async (req:Request, res:Response) => {
    try {
      const category = await CategoryModel.updateCategory(req.params.id, req.body.name)
      res.send(category)
    } catch (error) {
      throw error
    }
  },
  deleteCategory: async (req:Request, res:Response) => {
    try {
      const category = await CategoryModel.deleteCategory(req.params.id)
      res.send(category)
    } catch (error) {
      throw error
    }
  }
}

export default CategoriesControllers