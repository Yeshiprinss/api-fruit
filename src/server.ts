import express from "express";
import cors from 'cors';
import morgan from "morgan";
import routeCategories from "./v1/routes/categoryRoutes";
import routeProducts from "./v1/routes/productRoutes";

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors())
server.use(morgan('dev'))

server.use('/api/v1/', routeCategories)
server.use('/api/v1/', routeProducts)

export default server;