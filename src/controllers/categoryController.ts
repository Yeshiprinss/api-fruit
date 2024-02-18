import { Request, Response } from "express"
import CategoryModel from "../models/categoryModel"
import { CustomError } from "../utils/errors/custom.error";

const handlerError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
};

const CategoriesControllers = {
  getAllCategories: async (req:Request, res:Response) => {
    try {
      const name: string = req.query.name as string
      if (!name) {
        const allCategories = await CategoryModel.getAllCategory()
        return res.send({data: allCategories}); 
      }
      else{
        const categoryByName = await CategoryModel.getCategoryByName(name)
        if (!categoryByName) throw CustomError.badRequest("No category found")
        return res.json({data: categoryByName})
      }
    } catch (error) {
      handlerError(error, res)
    }
  },
  getCategoryById: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw CustomError.badRequest("No id provided")
      const category = await CategoryModel.getCategoryById(req.params.id)
      return res.json({data: category})
    } catch (error) {
      handlerError(error, res)
    }
  },
  createCategory: async (req:Request, res:Response) => {
    try {
      if (!req.body.name) throw CustomError.badRequest("No name provided")
      const category = await CategoryModel.createCategory(req.body.name)
      res.send(category)
    } catch (error) {
      handlerError(error, res)
    }
  },
  updateCategory: async (req:Request, res:Response) => {
    try {
      if (!req.params.name) throw CustomError.badRequest("No name provided")
      const category = await CategoryModel.updateCategory(req.params.id, req.body.name)
      res.send(category)
    } catch (error) {
      handlerError(error, res)
    }
  },
  deleteCategory: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw CustomError.badRequest("No id provided")
      const category = await CategoryModel.deleteCategory(req.params.id)
      res.send(category)
    } catch (error) {
      handlerError(error, res)
    }
  }
}

export default CategoriesControllers