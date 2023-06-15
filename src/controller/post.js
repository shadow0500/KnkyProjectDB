const pool = require("../../db");
const queries = require("../models/queries");
const auth = require("../middleware/auth");

const getPost = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getPost,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "something went wrong" });
  }
};
const getUserPostById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getUserPostById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "something went wrong" });
  }
};
const createPost = async (req, res) => {
  try {
    const {
      post_img,
      post_text,
      post_video,
      posted_at,
      modified_at,
      isdeleted,
      isfeautured,
    } = req.body;
    const resp = await pool.query(queries.createPost, [
      post_img,
      post_text,
      post_video,
      req.tokenData.userId,
      posted_at,
      modified_at,
      isdeleted,
      isfeautured,
    ]);
    res.status(201).send({ message: "Post created succesfully" });
  } catch (err) {
    res.status(401).send({ message: "Something went wrong" });
  }
};

const updatePost = (req, res) => {
  try {
    const id = req.params.id;
    const {
      post_img,
      post_text,
      post_video,
      posted_by,
      posted_at,
      modified_at,
      isdeleted,
      isfeautured,
    } = req.body;
    console.log(req.body);
    pool.query(queries.getUserPostById, [id], (err, results) => {
      const noPostFound = !results.rows.length;
      if (noPostFound) {
        res.send({ message: "Post with the Following Id doesnot exist in DB" });
      } else {
        pool.query(
          queries.updatePost,
          [
            post_img,
            post_text,
            post_video,
            posted_by,
            posted_at,
            modified_at,
            isdeleted,
            isfeautured,
            id,
          ],

          res.status(201).send({ message: "User updated post successfully" })
        );
      }
    });
  } catch (err) {
    res.status(401).send({ message: "Something went wrong" });
  }
};

const deletePost = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getUserPostById, [id], (err, results) => {
      const noPostFound = !results.rows.length;
      if (noPostFound) {
        res.send({ message: "Post with the Following Id doesnot exist in DB" });
      } else {
        pool.query(queries.deletePost, [id], (err, results) => {
          res.send({
            message: "Post with the Following Id deleted successfully",
          });
        });
      }
    });
  } catch (err) {
    res.status(401).send({ message: "Something went wrong" });
  }
};

module.exports = {
  createPost,
  getPost,
  getUserPostById,
  updatePost,
  deletePost,
};
