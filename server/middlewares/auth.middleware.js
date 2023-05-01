const admin = require('../firebase/index')
const UserSchema = require('../models/user.model');

const authCheck = async (req, res, next) => {
    console.log(req.headers)
    
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        console.log(`Firebase user in authCheck ${firebaseUser}`)
        req.user = firebaseUser;
        
        next();

    } catch (error) {
        res.status(401).json({err: "Invalid or expired token"})
    }
}

const adminCheck = async (req, res, next) =>{
    const {email} = req.user

    const adminUser = await UserSchema.findOne({email}).exec()
    if(adminUser.role !== 'admin'){
        res.status(403).json({err: "Access Denied"})
    }else{
        next()
    }
}

module.exports={
    authCheck, adminCheck
}