const pool = require("../../db");
const queries = require("../models/queries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const getUsers = (req, res) => {
  try {
    pool.query(queries.getUsers, (err, results) => {
      res.status(200).send(results.rows);
    });
  } catch (err) {
    res.status({ message: "Something went wrong" });
  }
};
const getUserById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getUserById, [id], (err, results) => {
      res.status(200).send(results.rows);
    });
  } catch (err) {
    res.status({ message: "Something went wrong" });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      dob,
      display_name,
      email,
      password,
      gender,
      sexualintersted,
      topicandlifestyle,
      hashtag,
      accounttype,
    } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    pool.query(queries.checkEmailExist, [email], async (err, results) => {
      if (results.rows.length) {
        res.send({ message: "Email Already Exists" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);
      pool.query(
        queries.registerUser,

        [
          first_name,
          last_name,
          dob,
          display_name,
          email,
          hashPassword,
          gender,
          sexualintersted,
          topicandlifestyle,
          hashtag,
          accounttype,
        ],
        next(),
        res.status(201).send({ message: "User created successfully" })
      );
    });
  } catch (err) {
    res.status(403).send({ message:'cannot create user'});
  }
};

const updateUser = (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      dob,
      display_name,
      email,
      password,
      gender,
      sexualintersted,
      topicandlifestyle,
      hashtag,
      accounttype,
    } = req.body;

    pool.query(queries.getUserById, [id], (err, results) => {
      const noUserFound = !results.rows.length;
      if (noUserFound) {
        res.send({ message: "User doesnt exist in DB" });
      } else {
        pool.query(
          queries.updateUser,
          [
            first_name,
            last_name,
            dob,
            display_name,
            email,
            password,
            gender,
            sexualintersted,
            topicandlifestyle,
            hashtag,
            accounttype,
            id,
          ],
          console.log(updateUser),
          res.status(201).send({ message: "Users Updated Successfully" })
        );
      }
    });
  } catch (err) {
    return res.status(403).send({ message: "User not available" });
  }
};

const removeUser = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getUserById, [id], (err, results) => {
      const noUserFound = !results.rows.length;
      if (noUserFound) {
        res.send({ message: "User doesnt exist in DB" });
      } else {
        pool.query(queries.removeUser, [id], (err, results) => {
          res.status(201).send({ message: "Users Removed Successfully" });
        });
      }
    });
  } catch (err) {
    res.status(403).send({ message: "User not available" });
  }
};

// Login

const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    pool.query(queries.checkEmailExist, [email], async (err, results) => {
      if (results.rows.length > 0) {
        const user = results.rows[0];
        console.log(user);
        const accessTokenSecret = process.env.accessTokenSecret;
        if (user.password === password) {
          const accessToken = await jwt.sign(
            { userId: user.userid, display_name: user.display_name || "shaad" },
            accessTokenSecret
          );
          res.send({
            accessToken,
          });
        } else {
          res.status(401).send({ message: "Invalid Password" });
        }
      } else {
        res.status(401).send({ message: "Email is not registered" });
      }
    });
  } catch (err) {
    return res.status(403).send({ message: "User not available" });
  }
};

// Logout
// const logoutUser = (req,res)=>{
//   try{
//     if(req.session){
//       req.session.destroy(err=>{
//         if(err){
//           res.status(400).send({message:'Unable to logout'})
//         } else {
//           res.status(201).send({message:'Logout Successfull'})
//         }
//       });
//     } else{
//       res.end();
//     }
//   }catch(err){
//     res.status(400).send({message:'User Already logged out'})
//   }
// }

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  removeUser,
  updateUser,
  loginUser,
  // logoutUser,
};
