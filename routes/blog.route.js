const express= require ("express");
const { addBlog, postbyBlog, allBlog, deleteblog, updateblog } = require("../controllers/blog.controller");
const { upload } = require("../middleware/uploadMiddleware");
const { userMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();


router.post("/addblog", userMiddleware, upload.single("hi"), addBlog);
router.get("/allblogs", allBlog);
router.get("/blog",userMiddleware, postbyBlog);
router.delete("/delete/:id", deleteblog);
router.put("/updateblog/:id", updateblog);

module.exports = router;