export function checkPhone(req ,res ,next){
    //next();
    const phone = req.userInfo['phone'];
    if(!phone){
        res.json({success : false , msg : "Please Register your phone number first"})
    }
}