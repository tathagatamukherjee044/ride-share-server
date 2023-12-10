import { log } from 'console';
import * as authService from '../services/authServices.js'
import * as userService from '../services/userService.js'
import { encode } from 'punycode';


export function createUser(req ,res ){
  const user = req.body
    res.send(userService.createUser(user));
}

export function authenticateUser(req ,res ){
    authService.authenticateUser(req,res);
}

export async function googleOAuthHandler(req ,res ){
    const code = req.query.code 

  try {
    // get the id and access token with the code
    const { id_token, access_token } = await userService.getGoogleOAuthTokens({ code });
    console.log({ id_token, access_token });

    // get user with tokens
    const googleUser = await userService.getGoogleUser( id_token, access_token );
    //jwt.decode(id_token);

    console.log({ googleUser });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    console.log("now to upsert");
    
    // upsert the user
    const user = await userService.createAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
      },
      {
        upsert: true,
        new: true,
      }
    )
    log(user)
    var token = await authService.createToken(user)
    const userData = {
      token : token,
      user : user
    }
    const encodedData = btoa(JSON.stringify(userData))
    res.redirect(`http://localhost:8100/auth/oauth?data=${encodedData}`);
  } catch (error) {
    console.log(error, "Failed to authorize Google user");
    return res.redirect(`http://localhost:4200/oauth/error`);
  }
}