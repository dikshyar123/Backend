const mongoose = require ("mongoose");
const commentSchema = new mongoose.Schema({
    title:{
        type: String, 
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    },
    UserBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})
const commentModel = mongoose.model("Comment", commentSchema);

module.exports = {commentModel};