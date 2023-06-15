const pool = require("../../db");
const queries = require("../models/queries");

const getHomefeed = (req, res) => {
  try {
    pool.query(queries.getHomefeed, (err, results) => {
      if (err) throw err;
      res.status(201).send(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
    getHomefeed,
}