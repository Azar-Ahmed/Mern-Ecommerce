const UserSchema = require('../models/user.model');

const createOrUpdateUser = async (req, res) =>{
    console.log(req.user)
    const {name , picture , email} = req.user;
    
    // check existing user & update
    const user = await UserSchema.findOneAndUpdate({email}, {name, picture}, {new: true})

    // If not found then create new user
    if(user){
        console.log('Update user')
        res.json(user)
    }else{
        const newUser = await new UserSchema({
            email, 
            name: user.email && user.email.split("@")[0],
             picture,
        }).save();
        console.log('create new user')
         res.json(newUser);

    }
    
}

const currentUser = async (req, res) =>{
    UserSchema.findOne({email: req.user.email}).exec((err, user)=>{
        if(err) throw new Error(err);
        res.json(user);
    })
}

module.exports={
    createOrUpdateUser,
    currentUser
}