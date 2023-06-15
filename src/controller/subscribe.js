const pool = require("../../db");
const queries = require("../models/queries");

const getSubscribers = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getSubscribers,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};
const getSubscriberById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getSubscriberById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};
const createSubscriber = (req, res) => {
  try {
    const { subscribed_by, subscribed_to, subscribed_at, unsubscribed_at } =
      req.body;
    pool.query(
      queries.createSubscriber,
      [subscribed_by, subscribed_to, subscribed_at, unsubscribed_at],
      res.status(201).send({ message: "subscribed successfully" })
    );
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};

module.exports = {
  getSubscribers,
  getSubscriberById,
  createSubscriber,
};
