import { Request, Response, NextFunction } from 'express'

const loggerMiddleware = (req:Request, res:Response, next:NextFunction): void => {  
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    next();    
}

export default loggerMiddleware