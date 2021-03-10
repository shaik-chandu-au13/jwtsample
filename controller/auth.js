const auth=(req,res,next)=>{
    if(req.session.userID){
        next()
    }
    else{
        return res.redirect('/login')
    }
}

module.exports=auth