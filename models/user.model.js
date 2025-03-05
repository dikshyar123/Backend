const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    phone:{
        type: Number,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    isVerified:{
         type: Boolean,
         default: false
    },
    otp:{
        type:Number,

    },
    otpExpires:{
        type:Date
    }
    
}, {
    timestamps: true
});
const userModel = mongoose.model("User", userSchema);

module.exports = {userModel};