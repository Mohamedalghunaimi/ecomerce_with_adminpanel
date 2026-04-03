var jwt = require('jsonwebtoken');

const createCookie = async(id)=> {
    try {
    var token = await jwt.sign({id}, 'shhhhh',{expiresIn:"1d"});
    return token
    }catch(err) {
        throw new Error(err)
    }
}

module.exports = {
    createCookie
}