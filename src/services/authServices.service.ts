import * as MongoUtils from "../mongo/mongoUtils.utils"
import * as passwordUtils from '../utils/passwordUtils.utils';
import * as tokenUtils from '../utils/tokenUtils.utils'
import axios from "axios";
import { config } from "../store/config.js";
import { Request, Response } from "express";



  export async function authenticateUser(req : Request,res : Response){
    const body = req.body;
    const phone = body.phone;
    const password = body.password;
    const query = {
        phone : phone
    }
    var result = await MongoUtils.getDocuments('user',query)
    console.log(result);
    if(result.length==1){
        var hashedPassword = result[0].password;
        var match = await passwordUtils.checkHashForPassword(password,hashedPassword);
        if(match){
            const userData : any = {};
            userData['name'] = result[0].name;
            userData['_id'] = result[0]._id;
            userData['phone'] = result[0].phone;
            var token = await tokenUtils.createToken(result[0]);
            res.json({success : true , msg : "user matched",token : token, userData : userData});
        }else {
            res.json({success : false , msg : "wrong password"});
        }
    }
    else {
        res.json({success : false , msg : "please create user"});
        // var passwordHash = await passwordUtils.generateHashForPassword(password, (user) => {
        //     res.json({ success: true, msg: user });
        // });
        // console.log(passwordHash);
        // var user = JSON.parse(JSON.stringify(body));
        // user.password=passwordHash;
        // var result = await MongoUtils.insertDocument('user',user)
        // res.send(result);
    }
    
}

