import { Request, Response } from "express"
import { CustomError } from "../utils/errors/custom.error";
import ProductModel from "../models/productModel";
import { saveImage } from "../utils/config/uploadMulter";
import { uploadImageToCloudinary } from "../utils/config";
import fs from 'fs/promises'

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
        const counProduct = Array.isArray(allProducts) ? allProducts.length : 0
        if (counProduct === 0) throw CustomError.notFound('No hay registros')
        return res.send({result:allProducts}); 
      }
      else{
        const productByName = await ProductModel.getProductByName(name)
        const counProduct = Array.isArray(productByName) ? productByName.length : 0
        if (counProduct === 0) throw CustomError.notFound('No hay registros')
        return res.send( {data: productByName})
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
      // if (Array.isArray(req.files)) {
      //   req.files?.map(saveImage);
      // }  // guardar varias imagenes con sus nombres propios opcion 2

      const { name, description, subCategory, stock, measurement, salesPrice, purchasePrice} = req.body
      let image : string = ''
      
      if (req.file?.filename){
        saveImage(req.file!) 
        const imgPath = 'uploads\\' + req.file?.originalname
        const result = await uploadImageToCloudinary(imgPath)
        image = result.secure_url

        await fs.unlink(imgPath)
      }
           
      if (!name) throw CustomError.badRequest("No name provided")
      if (!description) throw CustomError.badRequest("No description provided")
      if (!image) throw CustomError.badRequest("No image provided")
      if (!subCategory) throw CustomError.badRequest("No subCategory provided")
      if (!stock) throw CustomError.badRequest("No stock provided")
      if (!salesPrice) throw CustomError.badRequest("No salesPrice provided")
      if (!purchasePrice) throw CustomError.badRequest("No purchasePrice provided")
      if (isNaN(Number.parseFloat(stock))) throw CustomError.badRequest("Stock must be a number")
      if (isNaN(Number.parseFloat(salesPrice))) throw CustomError.badRequest("SalesPrice must be a number")
      if (isNaN(Number.parseFloat(purchasePrice))) throw CustomError.badRequest("PurchasePrice must be a number")
        
      const product = await ProductModel.createProduct(name, description, image, subCategory, parseFloat(stock), measurement, parseFloat(salesPrice),  parseFloat(purchasePrice))
      res.send(product)
    } catch (error) {
      handlerError(error, res)
    }
  },
  updateProduct: async (req:Request, res:Response) => {
    try {
      const { name, description, subCategory, stock, measurement, salesPrice, purchasePrice} = req.body
      let image : string = ''
      
      if (req.file?.filename){
        saveImage(req.file!) 
        const imgPath = 'uploads\\' + req.file?.originalname
        const result = await uploadImageToCloudinary(imgPath)
        image = result.secure_url
        
        await fs.unlink(imgPath)
      }

      if (!req.params.id) throw CustomError.badRequest("No id provided")
      if (!name) throw CustomError.badRequest("No name provided")
      if (!description) throw CustomError.badRequest("No description provided")
      if (!subCategory) throw CustomError.badRequest("No subCategory provided")
      if (!stock) throw CustomError.badRequest("No stock provided")
      if (!salesPrice) throw CustomError.badRequest("No salesPrice provided")
      if (!purchasePrice) throw CustomError.badRequest("No purchasePrice provided")
      if(!measurement) throw CustomError.badRequest("No measurement provided")

      const product = await ProductModel.updateProduct(req.params.id, name, description, image, subCategory, stock, measurement, salesPrice, purchasePrice)
      console.log(product)
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