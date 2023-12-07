import { log } from 'console';
import * as authService from '../services/authServices.js'
import * as userService from '../services/userService.js'


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

    console.log('user Crated');
    
    var token = await authService.createToken(user)

    console.log(token);
    

    // // create a session
    // // create a session
    // const session = await createSession(user._id, req.get("user-agent") || "");

    // // create an access token

    // const accessToken = signJwt(
    //   { ...user.toJSON(), session: session._id },
    //   { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    // );

    // // create a refresh token
    // const refreshToken = signJwt(
    //   { ...user.toJSON(), session: session._id },
    //   { expiresIn: config.get("refreshTokenTtl") } // 1 year
    // );

    // // set cookies
    // res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    // res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // redirect back to client
    res.json({success : true , msg : "user matched",token : token});
    // res.redirect('localhost:4200/');
  } catch (error) {
    console.log(error, "Failed to authorize Google user");
    return res.redirect(`http://localhost:4200/oauth/error`);
  }
}