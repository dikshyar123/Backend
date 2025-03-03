const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

const userMiddleware = async(req, res, next)=>{
    try {
        const Token = req.header("Authorization")?.replace("Bearer ","");
        if (!Token){
            res.status(200).json({
                message:"hello token is not available"
            });
        }
        // yo chai verify gareko token yedi token cha bhane chai yo code halne 
        // yo code ma chai .env bata secret token haleko ho 
        const data = jwt.verify(Token, process.env.Token); 
        // yo code chai k ko lagi bhnda chai aba sabai info nikalna id paisake pachi ani hamile jun tyo generatetoken.js ma id lekhya chum tyo ya rakhne ani aba -password chai kina garya bhanda kheri chai tyo password na dekhaune minus- ko kamm chai tei ho 
        
        const user=await userModel.findById(data.id).select('-password')
        console.log(user);
        req.user=user
        next()
    } catch (error){
        console.log(error);
        res.status(400).send(error);
    }
   
    
};
module.exports={userMiddleware};