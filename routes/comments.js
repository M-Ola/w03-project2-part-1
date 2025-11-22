const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const validateComment = require("../validateSchema/validateComment");

// GET all comments in database
router.get("/", (req, res) => {
  /* #swagger.tags = ['Comments']
     #swagger.summary = 'Get all comments in database'
     #swagger.responses[200] = {
       description: 'List of all comments',
       schema: { type: 'array', items: { $ref: "#/components/schemas/Comment" } }
     }
  */
  commentsController.getAllComments(req, res);
});

// GET all comments for a blog
router.get("/blog/:blogId", (req, res) => {
  /* #swagger.tags = ['Comments']
     #swagger.summary = 'Get all comments for a specific blog'
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
     #swagger.responses[200] = {
       description: 'Comment found',
       schema: { $ref: "#/components/schemas/Comment" }
     }
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
           schema: {
             type: "object",
             required: ["userName", "comment"],
             properties: {
               userName: { type: "string", example: "reviewer1" },
               comment: { type: "string", example: "Great post! Very insightful." }
             }
           },
         }
       }
     }
     #swagger.responses[201] = {
       description: 'Comment created successfully',
       schema: { type: 'object', properties: { id: { type: 'string' } } }
     }
     #swagger.responses[400] = { description: 'Validation error or invalid blogId' }
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
           schema: {
             type: "object",
             required: ["userName", "comment"],
             properties: {
               userName: { type: "string", example: "reviewer1" },
               comment: { type: "string", example: "Updated comment text" }
             }
           },
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
