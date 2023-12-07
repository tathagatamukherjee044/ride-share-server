

export const errorLogger = (err , req , res ,next ) => {
    console.log( `error ${err.message}`) 
    next(err) // calling next middleware
  }
  
export function errorHandler( err , req , res ,next ) {
    let responseData = {
        code: 200,
        message: err.message,
        success: false
    }
    return res.status(500).json( responseData)
}

  // Fallback Middleware function for returning 
  // 404 error for undefined paths
  export const invalidPathHandler = (req , res ,next ) => {
    res.status(404)
    res.send('invalid path')
  }