const pool = require("../../db");
const queries = require("../models/queries");

const getStory = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getStory,values, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};
const getStoryById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getStoryById, [id], (err, results) => {
      res.status(200).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

const createStory = (req, res) => {
  try {
    const {
      story_img,
      story_text,
      story_video,
      story_shared_by,
      story_type,
      storypostedat,
    } = req.body;
    console.log(req.body);
    pool.query(
      queries.createStory,
      [
        story_img,
        story_text,
        story_video,
        story_shared_by,
        story_type,
        storypostedat,
      ],
      res.status(201).send({ message: "Story created successfully" })
    );
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};
const updateStory = (req, res) => {
  try {
    const id = req.params.id;
    const {
      story_img,
      story_text,
      story_video,
      story_shared_by,
      story_type,
      storypostedat,
    } = req.body;
    console.log(req.body);
    pool.query(queries.getStoryById, [id], (err, results) => {
      const noStoryFound = !results.rows.length;
      if (noStoryFound) {
        res.send({ message: "Story doesnt exist in DB" });
      } else {
        pool.query(
          queries.updateStory,
          [
            story_img,
            story_text,
            story_video,
            story_shared_by,
            story_type,
            storypostedat,
            id,
          ],
          res.status(201).send({ message: "Story updated successfully" })
        );
      }
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

const deleteStory = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getStoryById, [id], (err, results) => {
      const noGroupFound = !results.rows.length;
      if (noGroupFound) {
        res.send({ message: "Story doesnt exist in DB" });
      } else {
        pool.query(queries.deleteStory, [id], (err, results) => {
          res.status(201).send({ message: "Story deleted successfully" });
        });
      }
    });
  } catch (err) {
    res.status(403).send({
      message: "The page you are looking for is not available right now",
    });
  }
};

module.exports = {
  getStory,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
};
