import express from "express";
import cors from 'cors';

import routeCategories from "./v1/routes/categories/index";
import morgan from "morgan";

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors())
server.use(morgan('dev'))

server.use('/api/v1/', routeCategories)

export default server;