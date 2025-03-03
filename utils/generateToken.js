const jwt = require ("jsonwebtoken");

const generateToken = (id)=>{
    return jwt.sign({id:id}, process.env.token,{
        expiresIn:"3d",
    })

}
module.exports = {generateToken};