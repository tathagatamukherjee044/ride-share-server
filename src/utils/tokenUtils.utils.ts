import jwt from "jsonwebtoken";
import fs from 'fs'
import { config } from "../store/config";

const tokenKey = "BROPSECRETTOKEN"
const privateKey = config.privateKey;
const publicKey = config.publicKey

export function createToken(data: any,options ={ expiresIn :"48h" }){
    var obj = {
        ...(options && options),
        algorithm: "RS256",
      }
      console.log(obj);
      console.log(privateKey);

      
    const token = jwt.sign({data}, privateKey, {
        ...(options && options),
        algorithm: "RS256",
      });
    return token;
}

export function verifyToken(token : string){
    return jwt.verify(token,privateKey);
}

    
