import * as MongoUtils from "../mongo/mongoUtils.utils"
import * as passwordUtils from '../utils/passwordUtils.utils';
import axios from "axios";
import { config } from "../store/config";
import { Request, Response } from "express";


interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}


export async function createUser(user: any){
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
        var passwordHash = await passwordUtils.generateHashForPassword(password, (user: any) => {
            return ({ success: true, msg: user });
        });
        console.log(passwordHash);
        var user = JSON.parse(JSON.stringify(user));
        user.password=passwordHash;
        await MongoUtils.insertDocument('user',user)
        return ({success : true , msg : "user created"});
    }
    
}

export async function createAndUpdateUser(req : Request,res : Response ){
    const body = req.body;
    const phone = body?.phone;
    const password = body?.password;
    const query = {
        phone : phone
    }
    var result = await MongoUtils.getDocuments('user',query)
    if(result.length==1){
        res.json({success : false , msg : "user already exists"})
    }
    else {
        var passwordHash = await passwordUtils.generateHashForPassword(password, (user : any) => {
            res.json({ success: true, msg: user });
        });
        console.log(passwordHash);
        var user = JSON.parse(JSON.stringify(body));
        user.password=passwordHash;
        await MongoUtils.insertDocument('user',user)
        res.json({success : true , msg : "user created"});
    }
    
}

export async function getGoogleUser(id_token : string , access_token : string): Promise<GoogleUserResult> {
    try {
      const res = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error(error, "Error fetching Google user");
      throw new Error(error.message);
    }
}

export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: config.googleClientId,
    client_secret: config.googleClientSecret,
    redirect_uri: config.googleOauthRedirectUrl,
    grant_type: "authorization_code",
  };

  try {
    const qs = new URLSearchParams(values)
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error(error.response.data.error);
    console.error(error, "Failed to fetch Google Oauth Tokens");
    throw new Error(error.message);
  }
}