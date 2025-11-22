const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const isValidObjectId = (id) => ObjectId.isValid(id);


// GET all itineraries
const getAllItineraries = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("itineraries").find();
    const itinerarie = await result.toArray();
    res.status(200).json(itinerarie);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch itineraries." });
  }
};


// GET single itinerary
const getSingleItinerary = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid blog ID format." });
  }

  try {
    const itineraryId = new ObjectId(id);
    const result = await mongodb
      .getDatabase()
      .collection("itineraries")
      .findOne({ _id: itineraryId});

    if (!result) {
      return res.status(404).json({ error: "Itinerary not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Fetch single error:", err);
    res.status(500).json({ error: "Failed to fetch itinerary" });
  }
};

// CREATE itinerary
const createItinerary = async (req, res) => {
  const itinerary = req.body; // already validated by Joi
  try {
    const response = await mongodb
      .getDatabase()
      .collection("itineraries")
      .insertOne(itinerary);
    if (!response.acknowledged) {
      return res.status(500).json({ error: "Insert not acknowledged." });
    }
    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: "Failed to create itinerary." });
  }
};


// UPDATE itinerary
const updateItinerary = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid itinerary ID format." });
  }

  const itinerary = req.body; // already validated by Joi
  try {
    const itineraryId = new ObjectId(id);
    const response = await mongodb.getDatabase().collection("itineraries").replaceOne({ _id: itineraryId }, itinerary);

    if (response.modifiedCount === 0) {
      return res.status(404).json({ error: "Itinerary not found or unchanged." });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update itinerary." });
  }
};


// DELETE itinerary
const deleteItinerary = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid itinerary ID format." });
  }

  try {
    const itineraryIdId = new ObjectId(id);
    const response = await mongodb
      .getDatabase()
      .collection("itineraries")
      .deleteOne({ _id: blogId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "Itinerary  not found." });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete itinerary." });
  }
};



module.exports = {
  getAllItineraries,
  getSingleItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary
};






