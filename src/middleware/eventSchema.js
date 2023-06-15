const Joi = require("joi");

const createEventSchema = (req, res, next) => {
  try {
    const schema = Joi.object({
      event_title: Joi.string().min(2).max(30).required(),
      event_img: Joi.any().required(),
      event_video: Joi.any().required().required(),
      event_description: Joi.string().min(2).max(30).required(),
      event_date: Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).required(),
      event_time: Joi.time().required(),
      ended_at: Joi.time().required(),
      started_at: Joi.time().required(),
      event_type: Joi.string().min(2).max(30).required(),
      event_restriction: Joi.string().min(2).max(30).required(),
      eventcreated_by: Joi.number().required(),
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
  createEventSchema,
};
