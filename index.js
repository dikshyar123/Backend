// yo chai dot env ko ho 
const dotenv= require("dotenv")
dotenv.config()
const express =  require ("express");
const mongoose= require ("mongoose");
const { dbConnection } = require("./db/dbConnection");
const { userModel } = require("./models/user.model");
const app = express();
const userrouter = require('./routes/user.route')
const blogrouter = require ('./routes/blog.route')
const commentrouter = require ('./routes/comment.route')
// yo app.use le chai postman ma help garcha send garna  this is also called middleware
app.use(express.json());
app.use("", userrouter);
app.use("",blogrouter);
app.use("", commentrouter);

// yo code chai tei post garna ho uta postman ma 
app.post("/user", async(req,res)=>{
    // console.log(req.body);
    const data = await userModel.create({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
    });
    // yo res.send le chai post man ma dekhauxa bhayo kam bhanera output ma 
    // res.send ("User Created Succesfully.");
// yo res.status le chai jhan sab details dinxa hamile lekheko 
    res.status(201).json({
        message:"User Created",
        data:data,
    })
});

app.get('/user',async(req,res)=>{
    const data = await userModel.find()
    res.status(200).json({
        message:"All User",
        data: data,
    })
})

app.get('/user/:id', async(req,res)=>{
    // const data = await userModel.findById({_id:req.params.id})   
    // yo params chai id bhako bela use garne ho 
    const data = await userModel.findById(req.params.id)  
    res.status(200).json({
        message:"Single Blog",
        data: data,
    })
})

app.get("/user/search", async (req,res)=>{
    console.log(req.query);
    const data = await userModel.find({name:req.query.title});
    res.status(200).json({
        message:"Find User",
        data:data,
    })
})


dbConnection();
app.listen(8000, ()=>{
    console.log("Server listening on 8000");
});

// mongoose.connect("mongodb://localhost:27017/Blog")