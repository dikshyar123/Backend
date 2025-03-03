const mongoose = require("mongoose");

async function dbConnection(){
    // mongoose
    // .connect("mongodb://localhost:27017/Blog")
    // .then(()=>{
    //   console.log("Database connection");
    // })
    // .catch(()=>{
    //     console.log("something wet wrong");
    // });
    try{
        const data = await mongoose.connect("mongodb://127.0.0.1:27017/User");
        console.log("Database connection successfully.");
    } catch(error){
        console.log(error);
    }

}
module.exports= {dbConnection};