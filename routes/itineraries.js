// routes/itineraries.js
const express = require("express");
const router = express.Router();
const itinerariesController = require("../controllers/itineraries");
const validateItinerary = require("../validateSchema/validateItinerary");

// GET all itineraries
router.get("/", (req, res) => {
  /* #swagger.tags = ['Itineraries']
     #swagger.summary = 'Get all itineraries'
     #swagger.responses[200] = {
       description: 'List of itineraries',
       schema: { $ref: "#/components/schemas/Itinerary" }
     }
  */
  itinerariesController.getAllItineraries(req, res);
});

// GET single itinerary
router.get("/:id", (req, res) => {
  /* #swagger.tags = ['Itineraries']
     #swagger.summary = 'Get itinerary by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the itinerary',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.responses[200] = { description: 'Itinerary found', schema: { $ref: "#/components/schemas/Itinerary" } }
     #swagger.responses[404] = { description: 'Itinerary not found' }
  */
  itinerariesController.getSingleItinerary(req, res);
});

// POST create itinerary
router.post("/", validateItinerary, (req, res) => {
  /* #swagger.tags = ['Itineraries']
     #swagger.summary = 'Create a new itinerary'
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/Itinerary" },   
         }
       }
     }
     #swagger.responses[201] = { description: 'Itinerary created successfully' }
     #swagger.responses[400] = { description: 'Validation error' }
  */
  itinerariesController.createItinerary(req, res);
});

// PUT update itinerary
router.put("/:id", validateItinerary, (req, res) => {
  /* #swagger.tags = ['Itineraries']
     #swagger.summary = 'Update itinerary by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the itinerary',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/Itinerary" }
         }
       }
     }
     #swagger.responses[204] = { description: 'Itinerary updated successfully' }
     #swagger.responses[404] = { description: 'Itinerary not found' }
  */
  itinerariesController.updateItinerary(req, res);
});

// DELETE itinerary
router.delete("/:id", (req, res) => {
  /* #swagger.tags = ['Itineraries']
     #swagger.summary = 'Delete itinerary by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the itinerary',
       required: true,
       schema: { type: 'string' }
     }
     #swagger.responses[204] = { description: 'Itinerary deleted successfully' }
     #swagger.responses[404] = { description: 'Itinerary not found' }
  */
  itinerariesController.deleteItinerary(req, res);
});

module.exports = router;
