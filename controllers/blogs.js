const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const isValidObjectId = (id) => ObjectId.isValid(id);


// GET all blogs
const getAllBlogs = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("blogs").find();
    const blogs = await result.toArray();
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch blogs." });
  }
};


// GET single blog
const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid blog ID format." });
  }

  try {
    const blogId = new ObjectId(id);
    const result = await mongodb.getDatabase().collection("blogs").findOne({ _id: blogId });

    if (!result) {
      return res.status(404).json({ error: "Blog not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Fetch single error:", err);
    res.status(500).json({ error: "Failed to fetch blog." });
  }
};

// CREATE blog
const createBlog = async (req, res) => {
  const blog = req.body; // already validated by Joi
  try {
    const response = await mongodb.getDatabase().collection("blogs").insertOne(blog);
    if (!response.acknowledged) {
      return res.status(500).json({ error: "Insert not acknowledged." });
    }
    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: "Failed to create blog." });
  }
};


// UPDATE blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid blog ID format." });
  }

  const blog = req.body; // already validated by Joi
  try {
    const blogId = new ObjectId(id);
    const response = await mongodb.getDatabase().collection("blogs").replaceOne({ _id: blogId }, blog);

    if (response.modifiedCount === 0) {
      return res.status(404).json({ error: "Blog not found or unchanged." });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update blog." });
  }
};


// DELETE blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid blog ID format." });
  }

  try {
    const blogId = new ObjectId(id);
    const response = await mongodb.getDatabase().collection("blogs").deleteOne({ _id: blogId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "Blog not found." });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete blog." });
  }
};



module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog
};






