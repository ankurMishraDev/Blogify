const { validateToken } = require("../services/auth");

function checkForAuthCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookie = req.cookies[cookieName];
        if(!tokenCookie){
            return next();
        };

        try{
            const userPayload = validateToken(tokenCookie);
            req.user = userPayload;
        } catch(error){}
        return next();
    }
}

function setUserInLocals(req, res, next) {
    res.locals.user = req.user;
    next();
  }
  

module.exports = {checkForAuthCookie,setUserInLocals};