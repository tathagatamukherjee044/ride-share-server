import * as authService from '../services/authServices.service'
import * as userService from '../services/userService.service'
import { Request,Response } from 'express';

export function createUser(req : Request,res : Response){
  const user = req.body
    res.send(userService.createUser(user));
}

export function authenticateUser(req : Request,res : Response){
    authService.authenticateUser(req,res);
}

export async function googleOAuthHandler(req : Request,res : Response){
    const code = req.query.code as string

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

    // upsert the user
    // const user = await findAndUpdateUser(
    //   {
    //     email: googleUser.email,
    //   },
    //   {
    //     email: googleUser.email,
    //     name: googleUser.name,
    //     picture: googleUser.picture,
    //   },
    //   {
    //     upsert: true,
    //     new: true,
    //   }
    // );

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
    res.redirect('localhost:4200/');
  } catch (error) {
    // log.error(error, "Failed to authorize Google user");
    return res.redirect(`localhost:4200//oauth/error`);
  }
}