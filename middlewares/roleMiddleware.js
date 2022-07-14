module.exports=(roles)=>{
    return(req, res, next)=>{
        const userRoe= req.body.role;
        if(roles.includes(userRoe)){
            next();
        }
        else{
            return req.status(401).send('You Can not Do It')
        }
    }
}