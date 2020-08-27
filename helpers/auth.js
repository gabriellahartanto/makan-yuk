function checkStaffLogin(req,res,next){
    console.log("PATH STAFF",req.path)
        if(req.session.staffId || req.session.studentId){
            return next()
        }else{
            res.redirect("back")
        }
}


module.exports = checkStaffLogin