// validateSchema/validateItinerary.js
const Joi = require("joi");

const itinerarySchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  destination: Joi.string().max(100).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  notes: Joi.string().max(500).optional(),
  createdAt: Joi.date().default(() => new Date()),
});

const validateItinerary = (req, res, next) => {
  const { error, value } = itinerarySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((d) => d.message) });
  }
  req.body = value;
  next();
};

module.exports = validateItinerary;
