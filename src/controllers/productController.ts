import { Request, Response } from "express"
import { CustomError } from "../utils/errors/custom.error";
import ProductModel from "../models/productModel";

const handlerError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
};

const ProductsControllers = {
  getAllProducts: async (req:Request, res:Response) => {
    try {
      const name: string = req.query.name as string
      if (!name) {
        const allProducts = await ProductModel.getAllProducts()
        return res.send({result:allProducts}); 
      }
      else{
        const productByName = await ProductModel.getProductByName(name)
        if (!productByName) throw CustomError.badRequest("No product found")
        return res.send( {results: productByName})
      }
    } catch (error) {
      handlerError(error, res)
    }
  },
  getProductById: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw CustomError.badRequest("No id provided")
      const product = await ProductModel.getProductById(req.params.id)
      return res.send(product)
    } catch (error) {
      handlerError(error, res)
    }
  },
  createProduct: async (req:Request, res:Response) => {
    try {
      if (!req.params.name) throw CustomError.badRequest("No name provided")
      const product = await ProductModel.createProduct(req.body.name)
      res.send(product)
    } catch (error) {
      handlerError(error, res)
    }
  },
  updateProduct: async (req:Request, res:Response) => {
    try {
      if (!req.params.name) throw CustomError.badRequest("No name provided")
      const product = await ProductModel.updateProduct(req.params.id, req.body.name)
      res.send(product)
    } catch (error) {
      handlerError(error, res)
    }
  },
  deleteProduct: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw CustomError.badRequest("No id provided")
      const product = await ProductModel.deleteProduct(req.params.id)
      res.send(product)
    } catch (error) {
      handlerError(error, res)
    }
  }
}

export default ProductsControllers