const Joi = require("joi");

const createAccountSchema = (req, res, next) => {
  try {
    const schema = Joi.object({
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
      dob: Joi.date().required(),
      display_name: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().min(5).max(70).required(),
      password: Joi.string().min(8).required(),
      gender: Joi.string().min(2).max(30).required(),
      sexualintersted: Joi.string().min(2).max(30).required(),
      topicandlifestyle: Joi.string().min(2).max(30).optional(),
      hashtag: Joi.string().min(2).max(30).optional(),
      accounttype: Joi.string().min(2).max(30).optional(),
    });
    validateRequest(req, next, schema);
  } catch (err) {
    res
      .status(403)
      .send({ message: "Please Enter the details as mentioned format" });
  }
};
const updateAccountSchema = (req, res, next) => {
  try {
    const schema = Joi.object({
      first_name: Joi.string().min(2).max(30).empty(""),
      last_name: Joi.string().min(2).max(30).empty(""),
      dob: Joi.date().empty(""),
      display_name: Joi.string().min(2).max(30).empty(""),
      email: Joi.string().email().empty(""),
      password: Joi.string().min(8).empty(""),
      gender: Joi.string().min(2).max(30).empty(""),
      sexualintersted: Joi.string().min(2).max(30).empty(""),
      topicandlifestyle: Joi.string().min(2).max(30).empty(""),
      hashtag: Joi.string().min(2).max(30).empty(""),
      accounttype: Joi.string().min(2).max(30).empty(""),
    });
    validateRequest(req, next, schema);
  } catch (err) {
    res
      .status(403)
      .send({ message: "Please Enter the details as mentioned format" });
  }
};

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    req.body = value;
    next();
  }
}

module.exports = {
  createAccountSchema,
  updateAccountSchema,
};
