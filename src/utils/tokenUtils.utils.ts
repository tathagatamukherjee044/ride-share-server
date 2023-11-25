import jwt from "jsonwebtoken";

const tokenKey = "BROPSECRETTOKEN"

export function createToken(data: any,options ={ expiresIn :"48h" }){
    const token = jwt.sign(data,tokenKey,options);
    return token;
}

export function verifyToken(token : string){
    return jwt.verify(token,tokenKey);
}

    
