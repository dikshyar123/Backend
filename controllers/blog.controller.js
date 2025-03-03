const { blogModel } = require("../models/blog.model");

const addBlog = async (req, res)=>{

const { title, description } = req.body;
console.log(title, description);

if (!req.file){
    res.status(400).json({
        message:"Image is required ",
    });
}
const blog = await blogModel.create({
    title:title, 
    description :description, 
    postBy: req.user._id,
    image: req.file.filename, 
});
res.status(201).json({
    message:"Blog Created Successfully.",
    status: "success", 
    data: blog,
});
};
const allBlog =async(req, res)=>{
    const data = await blogModel.find().populate("postBy")
    // populate le sab detail nikalxa
    res.status(200).json({
        message:"All Blog",
        data: data,
    })
}

const postbyBlog = async (req, res)=>{
    const user = req.user
    console.log(user);
    const blog = await blogModel.find({ postBy:user._id});
    res.status(200).json({
        message:"my blogs",
        data:blog
    })
}

// yo chai delete ko code ho 
const deleteblog = async (req, res)=>{
    const id = req.params.id;
    const data = await blogModel.findByIdAndDelete(id);
    return res.status(200).json({
        message : "blog deleted",
        data:data,
    })
}

// yo chai update ko ho hai 

const updateblog = async (req, res)=>{
    const id = req.params.id;
    const data= await blogModel.findByIdAndUpdate(id,{
        title:req.body.title,
        description:req.body.description,
    }, {
        new:true
    });

    // 201 bhaneko create 
    return res.status(200).json({
        message:"Blog updated",
        data: data, 
    });
}




module.exports ={addBlog, postbyBlog, allBlog, deleteblog, updateblog};