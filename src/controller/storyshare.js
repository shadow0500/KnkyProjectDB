const pool = require("../../db");
const queries = require("../models/queries");

const getStoryShare = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getStoryShare,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};
const getStoryShareById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getStoryShareById, [id],(err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};

const createStoryShare = (req, res) => {
  try {
    const { storyId, shared_at } = req.body;
    pool.query(
      queries.createStoryShare,
      [storyId, shared_at],
      (err, results) => {
        res
          .status(201)
          .send({ message: "You shared a post/story successfully" });
      }
    );
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};

module.exports = {
  getStoryShare,
  getStoryShareById,
  createStoryShare,
};
