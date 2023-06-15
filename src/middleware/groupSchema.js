const Joi = require("joi");

const createGroupSchema = (req, res, next) => {
    try {
      const schema = Joi.object({
        group_name:Joi.string().min(2).max(30).required(),
        group_username:Joi.string().min(3).max(30).required(),
        group_topic:Joi.string().min(2).max(30).required(),
        group_description:Joi.string().min(10).max(80).required(),
        group_links:Joi.string().min(8).max(30).optional(),
        group_hashtag:Joi.string().min(2).max(30).optional(),
        group_subscriptiontype:Joi.string().min(2).max(30).required(),
        group_subscriptionprice:Joi.number().required(),
        group_subscriptionvalidity:Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).required(),
        group_createdby:Joi.number().required(),
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
    createGroupSchema,
  }