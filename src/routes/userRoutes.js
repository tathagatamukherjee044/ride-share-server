import express from 'express';
import { checkSession } from '../middlewares/checkSession.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const userRouter = express.Router();


export default userRouter