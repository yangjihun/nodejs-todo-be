const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async(req,res) => {
    try{
        const {email, name, password} = req.body;
        const user = await User.findOne({email:email});
        if(user){
            throw new Error("이미 가입된 유저입니다");
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({email,name,password:hash});
        await newUser.save();
        res.status(200).json({status:"success"});
    } catch(err){
        res.status(400).json({status:"fail",err});
    }
}

module.exports = userController;