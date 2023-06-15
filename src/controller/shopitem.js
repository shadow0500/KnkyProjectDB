const pool = require("../../db");
const queries = require("../models/queries");

const getShopitems = async (req, res) => {
  try {
    pool.query(queries.getShopitems, (err, results) => {
      if (err) throw err;
      res.status(201).send(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
};

const getShopitemById = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const values = [offset, limit];
    const id = req.params.id;
    pool.query(queries.getShopitemById,values, [id], (err, results) => {
      res.status(201).send(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
};

const createShopitem = (req, res) => {
  try {
    const {
      item_name,
      brand_name,
      description,
      item_variation,
      item_size,
      item_selltype,
      item_price,
      item_endtime,
      item_photos,
      item_postedat,
      item_createdby,
    } = req.body;
    console.log(req.body);
    pool.query(
      queries.createShopitem,
      [
        item_name,
        brand_name,
        description,
        item_variation,
        item_size,
        item_selltype,
        item_price,
        item_endtime,
        item_photos,
        item_postedat,
        item_createdby,
      ],
      res.status(201).send({ message: "Shopitem created successfully" })
    );
  } catch (err) {
    res.status(403).send({ message: "Something went wrong" });
  }
};

const updateShopitem = (req, res) => {
  try {
    const id = req.params.id;
    const {
      item_name,
      brand_name,
      description,
      item_variation,
      item_size,
      item_selltype,
      item_price,
      item_endtime,
      item_photos,
      item_postedat,
      item_createdby,
    } = req.body;
    pool.query(queries.getShopitemById, [id], (err, results) => {
      const noShopitemFound = !results.rows.length;
      if (noShopitemFound) {
        res.status(404).send({ message: "shopitem not found" });
      } else {
        pool.query(
          queries.createShopitem,
          [
            item_name,
            brand_name,
            description,
            item_variation,
            item_size,
            item_selltype,
            item_price,
            item_endtime,
            item_photos,
            item_postedat,
            item_createdby,
            id,
          ],
          res.status(201).send({ message: "Shopitem created successfully" })
        );
      }
    });
  } catch (err) {
    res.status(403).send({ message: "something wrong heppened" });
  }
};

const deleteShopitem = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getShopitemById, [id], (err, results) => {
      const noShopitemFound = !results.rows.length;
      if (noShopitemFound) {
        res.status(404).send({
          message: "shopitem not found because shopId is not available in DB",
        });
      } else {
        pool.query(queries.deleteShopitem, [id], (err, results) => {
          res
            .status(201)
            .send({ message: "shopitem deleted successfully from DB" });
        });
      }
    });
  } catch (err) {
    res.status(403).send({ message: "something wrong heppened" });
  }
};

module.exports = {
  getShopitems,
  getShopitemById,
  createShopitem,
  updateShopitem,
  deleteShopitem,
};
