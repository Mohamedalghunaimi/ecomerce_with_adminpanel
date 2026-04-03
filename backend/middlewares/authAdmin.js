var jwt = require('jsonwebtoken');
require("dotenv").config()
const authAdmin = async(req,res,next) => {
    const {token} = req.headers 
    try {
        const decoded_token = await jwt.verify(token, 'shhhhh')
        if(decoded_token) {
            if(decoded_token===process.env.Email+process.env.Password) {
                return next()
            }
        }
        return res.json({
            success:false,
            message:"you are not admin"
        })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
    }
    
}

module.exports = {
    authAdmin
}