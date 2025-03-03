const express = require ("express");
const { userMiddleware } = require("../middleware/userMiddleware");
const { addcomment, updatecomment, deletecomment, blogcomment } = require("../controllers/comment.controller");

const router = express.Router();

router.post("/addcomment", userMiddleware, addcomment);
router.put("/updatecomment", userMiddleware, updatecomment);
router.delete("/deletecomment/:id", deletecomment);
router.get("/blogcomment/:id", blogcomment);


module.exports = router;