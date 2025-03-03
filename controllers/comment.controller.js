const { commentModel } = require("../models/comment.model");


const addcomment =  async (req, res)=>{
    const {title, blog, } = req.body;
    console.log(title, blog);
    console.log(title, blog);
    const comment = await commentModel.create({
        title: title,
        blog:blog,
        UserBy:req.user._id,
     })
     return res.status(201).json({
        message:"Comment Created Successfully.",
        status: "success", 
        data: comment,
    });
}

const updatecomment =  async (req, res)=>{
    console.log(req.body.title);
    const user=req.user
    const data = await commentModel.findOneAndUpdate({ UserBy: user._id}, {
        title:req.body.title
    }, {
        new:true
    })
    return res.status(200).json({
        message:"comment updated", 
        data: data,
    })
}

const deletecomment = async (req, res)=>{
    const data = await commentModel.findByIdAndDelete(req.params.id)
    // yo chai params garera delete gareko ho 

return res.status(200).json({
    message:"comment deleted", 
    data : data,
});
}
const blogcomment = async (req, res)=>{
    console.log(req.params.id);
    const data = await commentModel.find({blog:req.params.id}).populate('blog UserBy ')
    return res.status(200).json({
        message:" Comment of single blog😎", 
        data : data,
    });
}
module.exports = {addcomment, updatecomment, deletecomment, blogcomment};