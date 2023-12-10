import * as MongoUtils from "../mongo/mongoUtils.js"
import * as passwordUtils from '../utils/passwordUtils.js';
import axios from "axios";
import { config } from "../store/config.js";
import { log } from "console";



export async function createUser(user){
    const phone = user.phone;
    const password = user.password;
    const query = {
        phone : phone
    }
    var result = await MongoUtils.getDocuments('user',query)
    if(result.length==1){
        return ({success : false , msg : "user already exists"})
    }
    else {
        // var passwordHash = await passwordUtils.generateHashForPassword(password, (user) => {
        //     return ({ success: true, msg: user });
        // });
        console.log(passwordHash);
        var user = JSON.parse(JSON.stringify(user));
        // user.password=passwordHash;
        await MongoUtils.insertDocument('user',user)
        return ({success : true , msg : "user created"});
    }
    
}

export async function createAndUpdateUser(query ,updateDoc , options  = {upsert: true,returnNewDocument: true}){
  try {      
    var result = await MongoUtils.findOneAndUpdate('user',query,updateDoc,options)
    log(result)
    return result.value
  } catch (error) {
    console.log('error caought');
    
    throw error
  }
    
    
    
}

export async function getGoogleUser(id_token  , access_token ) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error, "Error fetching Google user");
      throw new Error(error.message);
    }
}

export async function getGoogleOAuthTokens({code}) {
  console.log(code);
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: config.googleClientId,
    client_secret: config.googleClientSecret,
    redirect_uri: config.googleOauthRedirectUrl,
    grant_type: "authorization_code",
  };

  console.log('here');
  try {
    console.log('here also');
    const qs = new URLSearchParams(values)
    log(qs)
    const res = await axios.post(
      url,
      qs,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(res);
    return res.data
  } catch (error) {
    console.error(error.response.data.error);
    console.error(error, "Failed to fetch Google Oauth Tokens");
    throw new Error(error.message);
  }
}