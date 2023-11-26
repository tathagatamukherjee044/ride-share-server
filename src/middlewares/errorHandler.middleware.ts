import { Request, Response, NextFunction} from "express"

export const errorLogger = (err : any, req : Request, res : Response,next : NextFunction) => {
    console.log( `error ${err.message}`) 
    next(err) // calling next middleware
  }
  
export function errorHandler( err : any, req : Request, res : Response,next : NextFunction) {
    let responseData = {
        code: 200,
        message: err.message,
        success: false
    }
    return res.status(500).json( responseData)
}

  // Fallback Middleware function for returning 
  // 404 error for undefined paths
  export const invalidPathHandler = (req : Request, res : Response,next : NextFunction) => {
    res.status(404)
    res.send('invalid path')
  }