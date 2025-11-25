const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs");
const validateBlog = require("../validateSchema/validateBlog");
const { isAuthenticated } = require('../middleware/authenticate');

// GET all blogs
router.get("/", (req, res) => {
  /* #swagger.tags = ['Blogs']
     #swagger.summary = 'Get all blogs'
     #swagger.responses[200] = { description: 'List of blogs' }
  */
  blogsController.getAllBlogs(req, res);
});

// GET single blog by ID
router.get("/:id", (req, res) => {
  /* #swagger.tags = ['Blogs']
     #swagger.summary = 'Get blog by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the blog',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.responses[200] = { description: 'Blog found' }
     #swagger.responses[404] = { description: 'Blog not found' }
  */
  blogsController.getSingleBlog(req, res);
});

// POST create new blog
router.post("/", isAuthenticated, validateBlog, (req, res) => {
  /* #swagger.tags = ['Blogs']
     #swagger.summary = 'Create a new blog'
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/Blog" }
         }
       }
     }
     #swagger.responses[201] = { description: 'Blog created successfully' }
     #swagger.responses[400] = { description: 'Validation error' }
  */
  blogsController.createBlog(req, res);
});

// PUT update blog by ID
router.put("/:id", isAuthenticated, validateBlog, (req, res) => {
  /* #swagger.tags = ['Blogs']
     #swagger.summary = 'Update blog by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the blog',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/Blog" }
         }
       }
     }
     #swagger.responses[204] = { description: 'Blog updated successfully' }
     #swagger.responses[404] = { description: 'Blog not found' }
  */
  blogsController.updateBlog(req, res);
});

// DELETE blog by ID
router.delete("/:id", isAuthenticated, (req, res) => {
  /* #swagger.tags = ['Blogs']
     #swagger.summary = 'Delete blog by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the blog',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.responses[204] = { description: 'Blog deleted successfully' }
     #swagger.responses[404] = { description: 'Blog not found' }
  */
  blogsController.deleteBlog(req, res);
});

module.exports = router;
