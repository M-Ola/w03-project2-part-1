// controllers/comments.js
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const isValidObjectId = (id) => ObjectId.isValid(id);

// READ: Get all comments for a blog
const getCommentsForBlog = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.blogId)) {
      return res.status(400).json({ error: "Invalid blogId format" });
    }
    const blogId = new ObjectId(req.params.blogId);
    const comments = await mongodb
      .getDatabase()
      .collection("comments")
      .find({ blogId })
      .toArray();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments." });
  }
};

// CREATE: Add a new comment
const createComment = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.blogId)) {
      return res.status(400).json({ error: "Invalid blogId format" });
    }
    const comment = { ...req.body, blogId: new ObjectId(req.params.blogId) };
    const response = await mongodb
      .getDatabase()
      .collection("comments")
      .insertOne(comment);
    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create comment." });
  }
};

// READ: Get a single comment by ID
const getSingleComment = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid comment ID format" });
    }
    const comment = await mongodb
      .getDatabase()
      .collection("comments")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comment." });
  }
};


// UPDATE: Update a comment by ID
const updateComment = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid comment ID format" });
    }
    const response = await mongodb
      .getDatabase()
      .collection("comments")
      .replaceOne({ _id: new ObjectId(req.params.id) }, req.body);
    if (response.modifiedCount === 0)
      return res.status(404).json({ error: "Comment not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment." });
  }
};

// DELETE: Remove a comment by ID
const deleteComment = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid comment ID format" });
    }
    const response = await mongodb
      .getDatabase()
      .collection("comments")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (response.deletedCount === 0)
      return res.status(404).json({ error: "Comment not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment." });
  }
};

module.exports = {
  getCommentsForBlog,
  createComment,
  getSingleComment,
  updateComment,
  deleteComment,
};
