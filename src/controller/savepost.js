const pool = require("../../db");
const queries = require("../models/queries");

const getSavepost = (req, res) => {
  try {
    pool.query(queries.getSavepost, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

const createSavepost = (req, res) => {
  try {
    const { postId, saved_at } = req.body;
    pool.query(queries.createSavepost, [postId, saved_at], (err, results) => {
      res.status(201).send({ message: "Post saved successfully" });
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

module.exports = {
  getSavepost,
  createSavepost,
};
