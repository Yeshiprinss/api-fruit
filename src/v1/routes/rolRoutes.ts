import {Router} from "express";
import RolesControllers from '../../controllers/rolController'

const routeRoles = Router();

routeRoles
.get('/roles',RolesControllers.getAllRoles)
.get('/roles/:id', RolesControllers.getRolById)

.post('/roles', RolesControllers.createRol)
.patch('/roles/:id', RolesControllers.updateRol)
.delete('/roles/:id', RolesControllers.deleteRol)

export default routeRoles;