const pool = require("../../db");
const queries = require("../models/queries");

const getShare = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getShare, values,(err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};
const getShareById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getShareById, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

const createShare = (req, res) => {
  try {
    const { postId, shared_at } = req.body;
    pool.query(queries.createShare, [postId, shared_at], (err, results) => {
      res.status(201).send({ message: "You shared a post/story successfully" });
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

module.exports = {
  getShare,
  getShareById,
  createShare,
};
