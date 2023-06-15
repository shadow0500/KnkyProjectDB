const pool = require("../../db");
const queries = require("../models/queries");

const getStoryComment = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getStoryComment,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Page not found" });
  }
};
const getStoryCommentById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getStoryCommentById, [id], (err, results) => {
      res.status(200).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Page not found" });
  }
};

const createStoryComment = (req, res) => {
  try {
    const { comment_text, storyId, comment_at, modified_at } = req.body;
    console.log(req.body);
    pool.query(
      queries.createStoryComment,
      [comment_text, storyId, comment_at, modified_at],
      res.status(201).send({ message: "comment created successfully" })
    );
  } catch (err) {
    res.status(403).send({ message: "Page not found" });
  }
};
const updateStoryComment = (req, res) => {
  try {
    const id = req.params.id;
    const { comment_text, storyId, comment_at, modified_at } = req.body;
    console.log(req.body);
    pool.query(queries.getStoryCommentById, [id], (err, results) => {
      const noGroupFound = !results.rows.length;
      if (noGroupFound) {
        res.send({ message: "comment doesnt exist in DB" });
      } else {
        pool.query(
          queries.updateStoryComment,
          [comment_text, storyId, comment_at, modified_at, id],
          res.status(201).send({ message: "comment updated successfully" })
        );
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Page not found" });
  }
};

const deleteStoryComment = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getStoryCommentById, [id], (err, results) => {
      const noStoryFound = !results.rows.length;
      if (noStoryFound) {
        res.send({ message: "comment doesnt exist in DB" });
      } else {
        pool.query(queries.deleteStoryComment, [id], (err, results) => {
          res.status(201).send({ message: "comment deleted successfully" });
        });
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Page not found" });
  }
};

module.exports = {
  getStoryComment,
  getStoryCommentById,
  createStoryComment,
  updateStoryComment,
  deleteStoryComment,
};
