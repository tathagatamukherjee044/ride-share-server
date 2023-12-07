import jwt from "jsonwebtoken";
import fs from 'fs'
import { config } from "../store/config.js";

const tokenKey = "BROPSECRETTOKEN"
const privateKey = config.privateKey;
const publicKey = config.publicKey

export function createToken(data,options ={ expiresIn :"48h" }){

      
    const token = jwt.sign({_id : data}, privateKey, {
        ...(options && options),
        algorithm: "RS256",
      });
    return token;
}

export function verifyToken(token ){
    return jwt.verify(token,publicKey,{
      algorithms: ["RS256"],
    });
}

    
