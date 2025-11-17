const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs");
const validateBlog = require("../validateSchema/validateBlog")

router.get("/", blogsController.getAllBlogs);
router.get("/:id", blogsController.getSingleBlog);

router.post("/blogs", validateBlog,  blogsController.createBlog);
router.put("/blogs/:id", validateBlog,  blogsController. updateBlog);
router.delete("/blogs/:id", blogsController.deleteBlog);

module.exports = router;