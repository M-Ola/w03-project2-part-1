const Joi = require("joi");

const commentSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  comment: Joi.string().min(1).max(500).required(),
  createdAt: Joi.date().default(() => new Date()),
});

const validateComment = (req, res, next) => {
  const { error, value } = commentSchema.validate(req.body, {
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

module.exports = validateComment;
