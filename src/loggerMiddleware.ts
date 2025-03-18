import { Request, Response, NextFunction } from 'express'

const allowedOrigins = ["http://localhost:5173","http://localhost:3000"]

const loggerMiddleware = (req:Request, res:Response, next:NextFunction): void => {  

    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    next();    
}

export default loggerMiddleware