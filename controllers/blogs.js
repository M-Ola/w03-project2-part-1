const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("blogs").find();
    const blogs = await result.toArray();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
};

const getSingle = async (req, res) => {
  try {
    const blogId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .findOne({ _id: blogId });

    if (!result) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact." });
  }
};




module.exports = {
  getAll,
  getSingle
};






