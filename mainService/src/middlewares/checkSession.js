import * as tokenUtils from "../utils/tokenUtils.js";

export function checkSession(req ,res ,next){
    //next();
    const token = req.headers['token'];
    console.log(token);
    if(!token){
        res.json({success : false , msg : "Invalid"})
    }
    try{
        const userInfo = tokenUtils.verifyToken(token );
        req.userInfo = userInfo
        console.log(userInfo);
        next();
    }
    catch (err ){
        console.log('Here is error');
        console.log(err);
        res.status(401)
        res.json({
            error : err.message ? err.message : "Invalid",
            success : false
        })
    }
}