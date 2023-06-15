const pool = require("../../db");
const queries = require("../models/queries");

const getGroups = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    pool.query(queries.getGroups, values,(err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res
      .status(403)
      .send({
        message: "The page you are looking for is not available right now",
      });
  }
};
const getGroupById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getGroupById, [id], (err, results) => {
      res.status(200).send(results.rows);
    });
  } catch (err) {
    res
      .status(403)
      .send({
        message: "The page you are looking for is not available right now",
      });
  }
};

const createGroup = (req, res) => {
  try {
    const {
      group_name,
      group_username,
      group_topic,
      group_description,
      group_links,
      group_hashtag,
      group_subscriptiontype,
      group_subscriptionprice,
      group_subscriptionvalidity,
      group_createdby,
    } = req.body;
    console.log(req.body);
    pool.query(
      queries.createGroup,
      [
        group_name,
        group_username,
        group_topic,
        group_description,
        group_links,
        group_hashtag,
        group_subscriptiontype,
        group_subscriptionprice,
        group_subscriptionvalidity,
        group_createdby,
      ],
      res.status(201).send({ message: "Group created successfully" })
    );
  } catch (err) {
    res
      .status(403)
      .send({
        message: "The page you are looking for is not available right now",
      });
  }
};
const updateGroup = (req, res) => {
  try {
    const id = req.params.id;
    const {
      group_name,
      group_username,
      group_topic,
      group_description,
      group_links,
      group_hashtag,
      group_subscriptionType,
      group_subscriptionPrice,
      group_subscriptionValidity,
      group_createdBy,
    } = req.body;
    console.log(req.body);
    pool.query(queries.getGroupById, [id], (err, results) => {
      const noGroupFound = !results.rows.length;
      if (noGroupFound) {
        res.send({ message: "Group doesnt exist in DB" });
      } else {
        pool.query(
          queries.updateGroup,
          [
            group_name,
            group_username,
            group_topic,
            group_description,
            group_links,
            group_hashtag,
            group_subscriptionType,
            group_subscriptionPrice,
            group_subscriptionValidity,
            group_createdBy,
            id,
          ],
          res.status(201).send({ message: "Group updated successfully" })
        );
      }
    });
  } catch (err) {
    res
      .status(403)
      .send({
        message: "The page you are looking for is not available right now",
      });
  }
};

const deleteGroup = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.deleteGroup, [id], (err, results) => {
      const noGroupFound = !results.rows.length;
      if (noGroupFound) {
        res.send({ message: "Group doesnt exist in DB" });
      } else {
        pool.query(queries.deleteGroup, [id], (err, results) => {
          res.status(201).send({ message: "Group deleted successfully" });
        });
      }
    });
  } catch (err) {
    res
      .status(403)
      .send({
        message: "The page you are looking for is not available right now",
      });
  }
};

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
