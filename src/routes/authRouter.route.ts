import express from 'express';
import * as authController from "../controllers/authController.controller"
import * as passwordUtils from '../utils/passwordUtils.utils';

const authRouter = express.Router();

// authRouter.post("/auth/signup", (req,res)=>{
//     const body = req.body;
//     const password = body.password;
//     passwordUtils.generateHashForPassword(password, (user) => {
//         // if (err) {
//         //   res.json({ success: false, msg: 'Failed to register user' });
//         // } else {
//           res.json({ success: true, msg: user });
//         // }
//       });
//     // console.log(result);
//     // res.send(result);
// })

authRouter.post("/auth/signup", authController.createUser)
authRouter.post("/auth/login", authController.authenticateUser)
authRouter.get("/auth/oauth/google", authController.authenticateUser)

// authRouter.post("/auth/login", async (req,res)=>{
//     const body = req.body;
//     const password = body.password;
//     var result = await passwordUtils.checkHashForPassword(password)
//     console.log(result);
//     res.send(result);
// })

export default authRouter;