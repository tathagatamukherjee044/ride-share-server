import { log } from "console";
import * as tokenUtils from "../utils/tokenUtils.js";

export function decodeToken(req ,res ,next){
    //next();
    const token = req.headers['token'];
    let userInfo
        if(token != null){
            console.log(token);
            console.log('tken found');
            try {
                userInfo = tokenUtils.verifyToken(token );

            }catch (err ){
                console.log('Here is error');
                console.log(err);
                // res.status(401)
                // res.json({
                //     error : err.message ? err.message : "Invalid",
                //     success : false
                // })
            }
            req.userInfo = userInfo
            next();
            }
            else 
                next()

    
}