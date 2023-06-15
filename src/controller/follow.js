const pool = require("../../db");
const queries = require("../models/queries");

const getFollowers = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getFollowers,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const getFollowerById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getFollowerById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const createFollower = (req, res) => {
  try {
    const { follow_by, follow_to, followed_at, status } = req.body;
    pool.query(
      queries.createFollower,
      [follow_by, follow_to, followed_at, status],
      res.status(201).send({ message: "Followed successfully" })
    );
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

module.exports = {
  getFollowers,
  getFollowerById,
  createFollower,
};
