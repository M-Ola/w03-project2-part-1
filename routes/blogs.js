/* onst express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs");
const validateBlog = require("../validateSchema/validateBlog")

router.get("/", blogsController.getAllBlogs);
router.get("/:id", blogsController.getSingleBlog);

router.post("/", validateBlog,  blogsController.createBlog);
router.put("/blogs/:id", validateBlog,  blogsController.updateBlog);
router.delete("/blogs/:id", blogsController.deleteBlog);

module.exports = router; */



const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs");
const validateBlog = require("../validateSchema/validateBlog");

// GET all blogs
router.get("/", blogsController.getAllBlogs);

// GET single blog by ID
router.get("/:id", blogsController.getSingleBlog);

// POST create new blog
router.post("/", validateBlog, blogsController.createBlog);

// PUT update blog by ID
router.put("/:id", validateBlog, blogsController.updateBlog);

// DELETE blog by ID
router.delete("/:id", blogsController.deleteBlog);

module.exports = router;
