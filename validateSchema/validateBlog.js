const Joi = require("joi");

const blogSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().max(100).required(),
  category: Joi.string().max(50).required(),
  summary: Joi.string().max(200).required(),
  createdAt: Joi.date().default(() => new Date()),
  userName: Joi.string().max(50).required()
});

const validateBlog = (req, res, next) => {
  const { error } = blogSchema.validate(req.body, { abortEarly: false });
  if (error, value) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: messages });
  }
  req.body = value;
  next();
};

module.exports = validateBlog;
