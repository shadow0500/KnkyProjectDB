const pool = require("../../db");
const queries = require("../models/queries");

const getComment = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getComment,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const getUserCommentById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getUserCommentById, [id], (err, results) => {
      res.status(200).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

const createComment = (req, res) => {
  try {
    const { comment_text, postId, comment_at, modified_at } = req.body;
    console.log(req.body);
    pool.query(
      queries.createComment,
      [comment_text, postId, comment_at, modified_at],
      res.status(201).send({ message: "comment created successfully" })
    );
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const updateComment = (req, res) => {
  try {
    const id = req.params.id;
    const { comment_text, postId, comment_at, modified_at } = req.body;
    console.log(req.body);
    pool.query(queries.getUserCommentById, [id], (err, results) => {
      const noGroupFound = !results.rows.length;
      if (noGroupFound) {
        res.send({ message: "comment doesnt exist in DB" });
      } else {
        pool.query(
          queries.updateComment,
          [comment_text, postId, comment_at, modified_at, id],
          res.status(201).send({ message: "comment updated successfully" })
        );
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

const deleteComment = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getUserCommentById, [id], (err, results) => {
      const noGroupFound = !results.rows.length;
      if (noGroupFound) {
        res.send({ message: "comment doesnt exist in DB" });
      } else {
        pool.query(queries.deleteComment, [id], (err, results) => {
          res.status(201).send({ message: "comment deleted successfully" });
        });
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

module.exports = {
  getComment,
  getUserCommentById,
  createComment,
  updateComment,
  deleteComment,
};
