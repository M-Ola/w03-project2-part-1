// routes/comments.js
const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const validateComment = require("../validateSchema/validateComment");

// GET all comments for a blog
router.get("/blog/:blogId", (req, res) => {
  /* #swagger.tags = ['Comments']
     #swagger.summary = 'Get all comments for a blog'
     #swagger.parameters['blogId'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the blog',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.responses[200] = {
       description: 'List of comments for the blog',
       schema: { type: 'array', items: { $ref: "#/components/schemas/Comment" } }
     }
     #swagger.responses[404] = { description: 'Blog not found or no comments' }
  */
  commentsController.getCommentsForBlog(req, res);
});

// GET single comment by ID
router.get("/:id", (req, res) => {
  /* #swagger.tags = ['Comments']
     #swagger.summary = 'Get a single comment by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the comment',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.responses[200] = { description: 'Comment found', schema: { $ref: "#/components/schemas/Comment" } }
     #swagger.responses[404] = { description: 'Comment not found' }
  */
  commentsController.getSingleComment(req, res);
});

// POST create a new comment for a blog
router.post("/blog/:blogId", validateComment, (req, res) => {
  /* #swagger.tags = ['Comments']
     #swagger.summary = 'Create a new comment for a blog'
     #swagger.parameters['blogId'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the blog',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/Comment" },
           example: {
             blogId: "64f123abc456def789012345",
             userName: "reviewer1",
             comment: "Great post!",
             createdAt: "2025-11-22T17:20:00Z"
           }
         }
       }
     }
     #swagger.responses[201] = { description: 'Comment created successfully' }
     #swagger.responses[400] = { description: 'Validation error' }
  */
  commentsController.createComment(req, res);
});

// PUT update comment by ID
router.put("/:id", validateComment, (req, res) => {
  /* #swagger.tags = ['Comments']
     #swagger.summary = 'Update a comment by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the comment',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/Comment" }
         }
       }
     }
     #swagger.responses[204] = { description: 'Comment updated successfully' }
     #swagger.responses[404] = { description: 'Comment not found' }
  */
  commentsController.updateComment(req, res);
});

// DELETE comment by ID
router.delete("/:id", (req, res) => {
  /* #swagger.tags = ['Comments']
     #swagger.summary = 'Delete a comment by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the comment',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.responses[204] = { description: 'Comment deleted successfully' }
     #swagger.responses[404] = { description: 'Comment not found' }
  */
  commentsController.deleteComment(req, res);
});

module.exports = router;
