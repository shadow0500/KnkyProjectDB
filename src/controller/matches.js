const pool = require("../../db");
const queries = require("../models/queries");

const getMatches = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit
  try {
    const values = [offset, limit];
    pool.query(queries.getMatches, values,(err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};
const getMatchById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getMatchById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};
const createMatch = (req, res) => {
  try {
    const { match_by, match_to, match_at, status } = req.body;
    pool.query(
      queries.createMatch,
      [match_by, match_to, match_at, status],
      (err, results) => {
        res.status(201).send({ message: "Wow Its a Match" });
      }
    );
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

module.exports = {
  getMatches,
  getMatchById,
  createMatch,
};
