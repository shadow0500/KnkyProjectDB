const Joi = require("joi");

const createShopItemSchema = (req, res, next) => {
  try {
    const schema = Joi.object({
      item_name: Joi.string().min(3).max(30).required(),
      brand_name: Joi.string().min(3).max(30).required(),
      description: Joi.string().min(8).max(80).required(),
      item_variation: Joi.string().min(3).max(30).required(),
      item_size: Joi.number().required(),
      item_selltype: Joi.string().min(3).max(30).required(),
      item_price: Joi.number().min(2).required(),
      item_endtime: Joi.time().required(),
      item_photos: Joi.any().required(),
      item_postedat: Joi.now()
        .timestamp("unix")
        .max(moment().unix() * 1000),
      item_createdby: Joi.number().required(),
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
  createShopItemSchema,
};
