const {User} = require("../models/user")
const {main} = require("../models/product") 
var jwt = require('jsonwebtoken');

const addToCart =async(req,res,next) => {
    const {id} = req ;
    const {itemId,size} = req.body
    try {
        await main();
        const user = await User.findById(id);
        const cartData= structuredClone(user.cartData)
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size]++
            }
            else {
                cartData[itemId][size]=1
            }
        }else {
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        user.cartData= cartData
        const newUser = await user.save()
        res.json({
            success:true,
            newUser
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
const updateCart = async(req,res,next)=> {
    const {id} = req
    const {value,size,itemId} = req.body;
    if(!value || !size || itemId) {
        return res.json({
            success:false,
            message:"missing details"
        })
    }
    try {
        await main();
        const user = await User.findById(id)
        const cartData = structuredClone(user.cartData)
        cartData[itemId][size] = Number(value)
        user.cartData= cartData
        const newUser = await user.save();
        res.json({
            success:true,
            newUser
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
const removeFromCart = async (req,res,next) => {
    const {id} = req;
    const {itemId,size} = req.body

    try {
        await main();
        const user = await User.findById(id)
        const cartData = structuredClone(user.cartData)
        delete cartData[itemId][size]
        user.cartData = cartData
        const newUser = await user.save();
        res.json({
            success:true,
            newUser
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })    
    }

}
const getCart = async(req,res,next)=> {
    const {id} = req ;
    try {
        await main();
        const user = await User.findById(id)
        const cartData = user.cartData ;
        res.json({
            success:true,
            cartData
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }

}
module.exports = {
    addToCart,updateCart,removeFromCart,getCart
}