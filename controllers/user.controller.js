const { userModel } = require("../models/user.model");
// yo chai pw hash garna ko lagi 
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const { emailConfig } = require("../utils/emailconfig");

// signup 
const register = async (req, res)=>{
    const { name, phone, email, password }= req.body;
    if (!name || !phone ||!email || !password){
      
        return res.status(400).json({
            message:"all field are required"
        })
    }
    // yo code chai password hash garna ko lagi ho 
    const encryptpassword = await bcrypt.hash(req.body.password,10);
    console.log(encryptpassword)
    // yo chai email already exist ko lagi 
    const existingUser = await userModel.findOne({
        email:req.body.email});
        if(existingUser){
            return res.status(400).json({
                message:"email already exist.",
            })
        }


    // yo chai otp ko code ho jasma js use garya cha math garera number lai strinf ma convert farera 
    const otp = Math.floor(Math.random() * 100000);
    const otpcheck = otp.toString().padEnd(5,"0");
    const data = await userModel.create ({
        name: name,
        phone: phone,
        email: email, 
        password: encryptpassword,
        otp: otpcheck,
        otpExpires: Date.now() + 5 * 60 * 1000,
    
    
    });
    await emailConfig(email, otpcheck)
    return res.status(200).json({
        message:"done!!"
    })
    
}
// yo chai otp ko code ho 
const otpVerify = async (req, res)=>{
  const {otp} =req.body;
  console.log(otp);
  if (!otp){
    return res.status(400).json({
      message:"Otp is required.",
    })
  }
  const user=await userModel.findOne({otp:otp})
  if(!user){
    return res.status(400).json({
      message:"Otp is not correct."
    })
  }
  if (user.otpExpires<Date.now()){
    return res.status(400).json({
      message:"Otp is expiry."
    })
  }
  // yo chai otp kina null rakhya bhanya chai kina ki tyo verify bhayo tesaile expire date ni null gareko aba na chahine bhayera
  user.isVerified=true
  user.otp=null
  user.otpExpires=null
  await user.save()
  return res.status(200).json({message:'your account is verified'})
}
//  yo chai login ko code ho 
const loginUser = async(req, res)=>{
    const {email, password}= req.body;
    if(!email||!password){
        return res.status(200).json({
            message:"email and password are required",
        })
    }

    const existinguser = await userModel.findOne({
        email: email,
      });
      if (!existinguser) {
        return res.status(200).json({
          message: "this email is not register.",
        });
      }
      const comparepassword =  await bcrypt.compare(
        password, //yo chai hamile lekhne normal pw ho
        existinguser.password //yo chai encrypted pw ho
      );
      console.log(comparepassword);
      if (!comparepassword) {

        return res.status(400).json({
          message: "password not correct.",
        });
      }
      const token=generateToken(existinguser._id);
      const showdata= await userModel.findById(existinguser._id).select("-password")

      return res.status(200).json({
        message: "login sucessfully.",
        token:token, 
        data:showdata,
      });
}

// yo chai singleuser ko lagi ho req.params.id use garincha yesma chai
const MyUser = async (req, res)=>{
    const user = await userModel.findById(req.params.id)
    return res.status(200).json({
        message:"single user",
        data : user,
    })
    
}
const myInfo = async (req, res)=>{
  // yo code chai k ho bhanda chai yesma ma chai aba my information hamro user ko sabai information dinxa 
 const data=req.user
 const user=await userModel.findById(data._id).select('-password')
  return res.status(200).json({
  message:"My information",
  data:user
 })
};



module.exports= {register,loginUser,MyUser,myInfo,otpVerify};
