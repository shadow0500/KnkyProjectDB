const Joi = require("joi");

const createChannelSchema = (req, res, next) => {
  try {
    const schema = Joi.object({
      channel_name: Joi.string().min(8).max(30).required(),
      channel_username: Joi.string().min(6).max(30).required(),
      channel_type: Joi.string().min(4).max(30).required(),
      channel_description: Joi.string().min(15).max(300).required(),
      channel_link: Joi.string().min(8).max(50).optional(),
      channel_hashtag: Joi.string().min(8).max(30).optional(),
      channel_createdby: Joi.number().required(),
      channel_created_at: Joi.now().timestamp('unix').max(moment().unix() * 1000),
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
  createChannelSchema,
};
