import  express  from "express";

const testRouter = express.Router();

testRouter.get("/helloWorld", (req,res)=>{
    
    res.send("Hello worjfihsdkh");
})

export default testRouter;