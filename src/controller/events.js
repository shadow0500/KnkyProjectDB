const pool = require("../../db");
const queries = require("../models/queries");

const getEvents = (req, res) => {
  try {
    pool.query(queries.getEvents, (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const getEventById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getEventById, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};
const createEvent = (req, res) => {
  try {
    const {
      event_title,
      event_img,
      event_video,
      event_description,
      event_date,
      event_time,
      ended_at,
      started_at,
      event_type,
      event_restriction,
      eventcreated_by,
    } = req.body;
    console.log(req.body);
    pool.query(
      queries.createEvent,
      [
        event_title,
        event_img,
        event_video,
        event_description,
        event_date,
        event_time,
        ended_at,
        started_at,
        event_type,
        event_restriction,
        eventcreated_by,
      ],
      res.status(201).send({ message: "Event Created successfully" })
    );
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

const updateEvent = (req, res) => {
  try {
    const id = req.params.id;
    const {
      event_title,
      event_img,
      event_video,
      event_description,
      event_date,
      event_time,
      ended_at,
      started_at,
      event_type,
      event_restriction,
      eventcreated_by,
    } = req.body;
    console.log(req.body);
    pool.query(queries.getEventById, [id], (err, results) => {
      const noEventFound = !results.rows.length;
      if (noEventFound) {
        res.send({
          message: "Event with the Following Id doesnot exist in DB",
        });
      } else {
        pool.query(
          queries.updateEvent,
          [
            event_title,
            event_img,
            event_video,
            event_description,
            event_date,
            event_time,
            ended_at,
            started_at,
            event_type,
            event_restriction,
            eventcreated_by,
            id,
          ],
          res.status(201).send({ message: "Event updated  successfully" })
        );
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

const deleteEvent = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getEventById, [id], (err, results) => {
      const noEventFound = !results.rows.length;
      if (noEventFound) {
        res.send({
          message: "Event with the Following Id doesnot exist in DB",
        });
      } else {
        pool.query(queries.deleteEvent, [id], (err, results) => {
          res.send({
            message: "Event with the Following Id deleted successfully",
          });
        });
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Please try again after sometime" });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
