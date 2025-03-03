const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true, 
    },
    description:{
        type: String, 
        required: true,
    },
    image:{
        type: String, 
        required: true,
    },
    postBy:{
        type: mongoose.Schema.Types.ObjectId, 
        // yo code chai posted by ko lagi ko id bata rakhen yo lekhera reffrence ma chai user lai halne bcoz it is posted by user
        ref: "User",
    },
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = {blogModel};