export function logger (req,res,next){
    let log = ``;
    if(req.userInfo){
        log += `User: ${req.userInfo.name} `;
    }
    log += `url: ${req.url}`
    next();
}