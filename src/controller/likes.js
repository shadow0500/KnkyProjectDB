const pool = require("../../db");
const queries = require("../models/queries");

const getLikes = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getLikes,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

const getLikeById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getLikeById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

const createLike = (req, res) => {
  try {
    const { postId, liked_at } = req.body;
    pool.query(queries.createLike, [postId, liked_at], (err, results) => {
      res.status(201).send({ message: "You liked succesfully" });
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

module.exports = {
  getLikes,
  getLikeById,
  createLike,
};
