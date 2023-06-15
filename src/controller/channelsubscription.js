const pool = require("../../db");
const queries = require("../models/queries");

const getSubscriptions = (req, res) => {
  try {
    pool.query(queries.getSubscriptions, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const getSubscriptionById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getSubscriptionById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const createSubscription = (req, res) => {
  try {
    const {
      subscription_type,
      subscription_price,
      subscription_validity,
      subscribed_to,
    } = req.body;
    console.log(req);
    pool.query(
      queries.createSubscription,
      [
        subscription_type,
        subscription_price,
        subscription_validity,
        subscribed_to,
      ],
      res.status(201).send({
        message: "channelSubscription created successfully",
      })
    );
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

const updateSubscription = (req, res) => {
  try {
    const id = req.params.id;
    const {
      subscription_type,
      subscription_price,
      subscription_validity,
      subscribed_to,
    } = req.body;
    console.log(req.body);
    pool.query(queries.getSubscriptionById, [id], (err, results) => {
      const noSubscriptionFound = !results.rows.length;
      if (noSubscriptionFound) {
        res.send({
          message: "Subscription with the Following Id doesnot exist in DB",
        });
      } else {
        pool.query(
          queries.updateSubscription,
          [
            subscription_type,
            subscription_price,
            subscription_validity,
            subscribed_to,
            id,
          ],
          res
            .status(201)
            .send({ message: "Subscription updated  successfully" })
        );
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

module.exports = {
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
};
