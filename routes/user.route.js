const express = require ("express");
const { register, loginUser, MyUser, myInfo, otpVerify } = require("../controllers/user.controller");
const { userMiddleware } = require("../middleware/userMiddleware");
const router= express.Router();

router.post("/register", register)
router.post("/login", loginUser)
// yo id cai single user ko lagi ho 
router.get("/myinfo/:id",  MyUser)
router.get("/singleuser", userMiddleware, myInfo)
router.post("/otpverify", otpVerify);


module.exports = router;