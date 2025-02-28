const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../public/uploads"));
    },
    filename: function (req, file, cb) {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}-${suffix}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    return res.render("addBlog.ejs");
});

router.get("/:id", async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comment = await Comment.find({blogId:req.params.id}).populate("createdBy");
    return res.render("blogs.ejs",{
        user:req.user,
        blog,
        comment,
    })
})
router.post("/add-new", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const blog = await Blog.create({
        title,
        body,
        coverImage: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    });
    return res.redirect(`/blog/${blog._id}`);
});

router.post("/comment/:blogId", async(req,res)=>{
    await Comment.create({
        content: req.body.content,
        createdBy: req.user._id,
        blogId: req.params.blogId,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
})
module.exports = router;