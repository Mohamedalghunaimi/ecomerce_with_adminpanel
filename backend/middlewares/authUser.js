var jwt = require('jsonwebtoken');

const authUser = async (req,res,next) => {
    const {token} = req.headers ;
    try {
        const decodedToken = await jwt.verify(token, 'shhhhh')
        if(!decodedToken) {
            return res.json({
                success:false,
                message:"you must be user"
            })
        }
        req.id = decodedToken.id
        next()
        
    } catch (error) {
        console.log("yes")
        return res.json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {
    authUser
}