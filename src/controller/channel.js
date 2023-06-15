const pool = require("../../db");
const queries = require("../models/queries");

const getChannels = (req, res) => {
  try {
    pool.query(queries.getChannels, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const getChannelById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getChannelById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const createChannel = (req, res) => {
  try {
    const {
      channel_name,
      channel_username,
      channel_type,
      channel_description,
      channel_link,
      channel_hashtag,
      channel_createdby,
      channel_created_at,
    } = req.body;
    console.log(req);
    pool.query(
      queries.createChannel,
      [
        channel_name,
        channel_username,
        channel_type,
        channel_description,
        channel_link,
        channel_hashtag,
        channel_createdby,
        channel_created_at,
      ],

      res.status(201).send({ message: "Channel Created successfully" })
    );
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

const updateChannel = (req, res) => {
  try {
    const id = req.params.id;
    const {
      channel_name,
      channel_username,
      channel_type,
      channel_description,
      channel_link,
      channel_hashtag,
      channel_createdby,
      channel_created_at,
    } = req.body;
    console.log(req.body);
    pool.query(queries.getChannelById, [id], (err, results) => {
      const noEventFound = !results.rows.length;
      if (noEventFound) {
        res.send({
          message: "Channel with the Following Id doesnot exist in DB",
        });
      } else {
        pool.query(
          queries.updateChannel,
          [
            channel_name,
            channel_username,
            channel_type,
            channel_description,
            channel_link,
            channel_hashtag,
            channel_createdby,
            channel_created_at,
            id,
          ],

          res.status(201).send({ message: "Channel updated  successfully" })
        );
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

const deleteChannel = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getChannelById, [id], (err, results) => {
      const noChannelFound = !results.rows.length;
      if (noChannelFound) {
        res.send({
          message: "Channel with the Following Id doesnot exist in DB",
        });
      } else {
        pool.query(queries.deleteChannel, [id], (err, results) => {
          res.send({
            message: "Channel with the Following Id deleted successfully",
          });
        });
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

module.exports = {
  getChannels,
  getChannelById,
  createChannel,
  updateChannel,
  deleteChannel,
};