import * as tokenUtils from "../utils/tokenUtils.utils"
import { Request, Response, NextFunction } from "express";

export function checkSession(req : Request,res : Response,next : NextFunction){
    //next();
    const body = req.body;
    const token = req.get('token');
    console.log(req);
    if(!token){
        res.json({success : false , msg : "Invalid"})
    }
    try{
        const userInfo = tokenUtils.verifyToken(token as string);
        next();
    }
    catch (err : any){
        console.log('Here is error');
        console.log(err);
        res.status(401)
        res.json({
            error : err.message ? err.message : "Invalid",
            success : false
        })
    }
}