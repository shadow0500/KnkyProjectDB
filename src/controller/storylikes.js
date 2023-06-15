const pool = require("../../db");
const queries = require("../models/queries");

const getStoryLikes = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getStoryLikes,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};

const getStoryLikeById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getStoryLikeById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};

const createStoryLike = (req, res) => {
  try {
    const { storyId, liked_at } = req.body;
    pool.query(queries.createStoryLike, [storyId, liked_at], (err, results) => {
      res.status(201).send({ message: "You liked succesfully" });
    });
  } catch (err) {
    res.status(403).send({ message: "Page not available" });
  }
};

module.exports = {
  getStoryLikes,
  getStoryLikeById,
  createStoryLike,
};
