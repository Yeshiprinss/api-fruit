import {Router} from "express";
import UsersControllers from '../../controllers/userController'

const routeUsers = Router();

routeUsers
.get('/users',UsersControllers.getAllUsers)
.get('/users/:id', UsersControllers.getUserById)

.post('/users/login', UsersControllers.loginUser)

.post('/users', UsersControllers.createUser)
.patch('/users/:id', UsersControllers.updateUser)
.delete('/users/:id', UsersControllers.deleteUser)

export default routeUsers;