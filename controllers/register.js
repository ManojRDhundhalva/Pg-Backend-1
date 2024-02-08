const pool = require("../db");
const queries = require("../queries/register");
const bcrypt = require('bcrypt');
const util = require('util');
require('dotenv').config();

const saltRounds = Number(process.env.SALT_ROUNDS);
const hashAsync = util.promisify(bcrypt.hash);

const createAccount = async (req, resp) => {
  const { username, emailid, password } = req.body;

  try {
    const usernameResult = await pool.query(queries.getUserName, [username]);
    if (usernameResult.rows.length !== 0) {
      return resp.json("UserName Already Exist");
    }

    const emailResult = await pool.query(queries.getEmailId, [emailid]);
    if (emailResult.rows.length !== 0) {
      return resp.json("Email-id is Already Registered");
    }

    const newPassword = await hashAsync(password, saltRounds);

    const createAccountResult = await pool.query(queries.createAccount, [username, emailid, newPassword]);

    resp.status(201).json("Created Successfully");
  } catch (error) {
    console.error(error);
    resp.status(500).json("Internal Server Error");
  }
};

module.exports = {
  createAccount,
};
