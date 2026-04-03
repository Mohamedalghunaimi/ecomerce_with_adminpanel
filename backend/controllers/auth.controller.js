const { createCookie } = require("../methods/cookies-token");
const { main } = require("../models/product");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs")
const validator = require('validator');
var jwt = require('jsonwebtoken');
require("dotenv").config()

const register = async(req,res,next) => {
    const {name,email,password} = req.body
    try {
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"please enter correct email"})
        }
        if(!validator.isLength(password,{min:8})) {
            return res.json({success:false,message:"please enter strong password"})
        }
        await main();
        const user = await User.findOne({email})
        if(user) {
            return res.json({success:false,message:"you have already account"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password:hashPassword
        })
        const userSaved = await newUser.save();
        const token = await createCookie(userSaved._id);
        return res.json({success:true,token})
    }catch(err) {
        console.log(err)
        res.json({success:false,message:err.message})

    }
}
const login = async (req,res,next) => {
    const {email,password}= req.body;
    try {
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"please enter correct email"})
        }
        await main();
        const user = await User.findOne({email})
        if(!user) {
            return res.json({success:false,message:"you must login before"})
        }
        const check = await bcrypt.compare(password,user.password);
        if(!check) {
            return res.json({success:false,message:"password is not correct"})
        }
        const token = await createCookie(user._id);
        res.json({
            success:true,
            token
        })
    }catch(err) {
        console.log(err)
        res.json({success:false,message:err.message})
    }
}


const loginAsAdmin = async (req,res,next)=> {
    const {email,password} = req.body
    try {
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"please enter correct email"})
        }
        if((email===process.env.Email)&&(password===process.env.Password)) {
            var token = jwt.sign(email+password, 'shhhhh');
            res.json({
                success:true,
                token
            })
        }
        else {
            return res.json({
                success:false,
                message:"informations is not correct"
            })
        }
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
    }
}


module.exports = {
    register,login,loginAsAdmin
}
