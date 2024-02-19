import express from "express";
import cors from 'cors';
import morgan from "morgan";
import routeCategories from "./v1/routes/categoryRoutes";
import routeProducts from "./v1/routes/productRoutes";
import routeUsers from "./v1/routes/userRoutes";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors())
server.use(morgan('dev'))

server.use('/api/v1/', routeCategories)
server.use('/api/v1/',  routeProducts)
server.use('/api/v1/',  routeUsers)


export default server;