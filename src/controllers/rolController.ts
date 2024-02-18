import { Request, Response } from "express"
import RolModel from "../models/rolModel"
import { CustomError } from "../utils/errors/custom.error";

const handlerError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
};

const RolesControllers = {
  getAllRoles: async (req:Request, res:Response) => {
    try {
      const name: string = req.query.name as string
      if (!name) {
        const allRoles = await RolModel.getAllRoles()
        const countRol = Array.isArray(allRoles) ? allRoles.length : 0
        if (countRol === 0) throw CustomError.notFound('No hay registros')
        return res.send({data: allRoles}); 
      }
      else{
        const rolByName = await RolModel.getRolByName(name)
        const countRol =Array.isArray(rolByName) ? rolByName.length : 0
        if (countRol === 0) throw CustomError.notFound('No hay registros')
        return res.json({data: rolByName})
      }
    } catch (error) {
      handlerError(error, res)
    }
  },
  getRolById: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw CustomError.badRequest("No id provided")
      const rol = await RolModel.getRolById(req.params.id)
      return res.json({data: rol})
    } catch (error) {
      handlerError(error, res)
    }
  },
  createRol: async (req:Request, res:Response) => {
    try {
      if (!req.body.name) throw CustomError.badRequest("No name provided")
      const rol = await RolModel.createRol(req.body.name)
      res.send(rol)
    } catch (error) {
      handlerError(error, res)
    }
  },
  updateRol: async (req:Request, res:Response) => {
    try {
      if (!req.body.name) throw CustomError.badRequest("No name provided")
      const rol = await RolModel.updateRol(req.params.id, req.body.name)
      res.send(rol)
    } catch (error) {
      handlerError(error, res)
    }
  },
  deleteRol: async (req:Request, res:Response) => {
    try {
      if (!req.params.id) throw CustomError.badRequest("No id provided")
      const rol = await RolModel.deleteRol(req.params.id)
      res.send(rol)
    } catch (error) {
      handlerError(error, res)
    }
  }
}

export default RolesControllers