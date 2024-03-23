import { Request, Response } from "express"
import { CustomError } from "../utils/errors/custom.error";
import UserModel from "../models/userModel";
import { Validators } from "../utils/config/validators";

const handlerError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
};

const UsersControllers = {
  getAllUsers: async (req:Request, res:Response) => {
    try {
      const name: string = req.query.name as string
      if (!name) {
        const allUsers = await UserModel.getAllUsers()
        const countUser = Array.isArray(allUsers) ? allUsers.length : 0
        if (countUser === 0) throw CustomError.notFound('No hay registros')
        return res.send({result:allUsers}); 
      }
      else{
        const userByName = await UserModel.getUserByName(name)
        const countUser = Array.isArray(userByName) ? userByName.length : 0
        if (countUser === 0) throw CustomError.notFound('No hay registros')
        return res.send( {data: userByName})
      }
    } catch (error) {
      handlerError(error, res)
    }
  },
  getUserById: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw CustomError.badRequest("No id provided")
      const user = await UserModel.getUserById(req.params.id)
      return res.send(user)
    } catch (error) {
      handlerError(error, res)
    }
  },
  createUser: async (req:Request, res:Response) => {
    try {

      const { email, password, name, lastName, phone, isAdmin} = req.body

      if (!email) throw CustomError.badRequest("No email provided")
      if(!Validators.email.test(email)) throw CustomError.badRequest("Email is not valid")
      if (!password) throw CustomError.badRequest("No password provided")
      if (!name) throw CustomError.badRequest("No name provided")
      
      if (password.length < 6) throw CustomError.badRequest("Password must have at least 6 characters")
      if (password.length > 20) throw CustomError.badRequest("Password must have at most 20 characters")

      const user = await UserModel.createUser( {email, password, name, lastName, phone, isAdmin })
      res.send(user)
    } catch (error) {
      handlerError(error, res)
    }
  },
  updateUser: async (req:Request, res:Response) => {
    try {
      const { email, password, name, lastName, phone, isAdmin = 0 } = req.body

      if (!req.params.id) throw CustomError.badRequest("No id provided")
      if (!email) throw CustomError.badRequest("No email provided")
      if(!Validators.email.test(email)) throw CustomError.badRequest("Email is not valid")
      if (!name) throw CustomError.badRequest("No name provided")

      // if (password.length < 6) throw CustomError.badRequest("Password must have at least 6 characters")

      //TODO: HACER BUCLE PARA UPDATE Y CREAR FUNCION CAMPO: VALOR
     
      const user = await UserModel.updateUser( req.params.id, { email, password, name, lastName, phone, isAdmin})
      res.send(user)
    
    } catch (error) {
      handlerError(error, res)
    }
  },
  deleteUser: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw CustomError.badRequest("No id provided")
      const user = await UserModel.deleteUser(req.params.id)
      res.send(user)
    } catch (error) {
      handlerError(error, res)
    }
  },
  loginUser: async (req:Request, res:Response) => {
    try {
      const { email, password } = req.body

      if (!email) throw CustomError.badRequest("No email provided")
      if (!password) throw CustomError.badRequest("No password provided")

      const user = await UserModel.loginUser({email, password})
      res.send(user)
    } catch (error) {
      handlerError(error, res)
    }
  }
}

export default UsersControllers