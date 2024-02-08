const pool = require("../db");
const queries = require("../queries/login");

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const util = require('util');
require('dotenv').config();

const compareAsync = util.promisify(bcrypt.compare);
const saltRounds = Number(process.env.SALT_ROUNDS);
const hashAsync = util.promisify(bcrypt.hash);

const getAccount = async (req, resp) => {
  const { username, password } = req.body;

  try {
    const results = await pool.query(queries.getAccountByUserName, [username]);

    if (results.rows.length !== 1) {
      return resp.json("User not found");
    }
    const { id } = results.rows[0];
    const storedPassword = results.rows[0].password;

    const result = await compareAsync(password, storedPassword);

    if (result) {
      const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
      resp.status(200).json(token);
    } else {
      resp.json('Incorrect Password');
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json("Internal Server Error");
  }
};

const getEmailIdByUserName = async (req, resp) => {

  try {
    const results = await pool.query(queries.getEmailIdByUserName, [req.params.username]);
    if (results.rows.length !== 1) {
      return resp.json("EmailId not found");
    }

    const emailid = results.rows[0];
    resp.status(200).json(emailid);

  } catch (err) {
    resp.status(500).json("Internal Server Error");
  }
}

const updatePassword = async (req, resp) => {

  const { username, password } = req.body;
  const newPassword = await hashAsync(String(password), saltRounds);

  try {
    const results = await pool.query(queries.updatePassword, [newPassword, username]);
    resp.status(200).json("success");

  } catch (err) {
    resp.status(500).json("Internal Server Error");
  }
}

module.exports = {
  getAccount,
  getEmailIdByUserName,
  updatePassword
};
