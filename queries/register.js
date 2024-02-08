const createAccount = "INSERT INTO users (userName, emailId, password) VALUES ($1, $2, $3)";
const getUserName = "SELECT userName FROM users WHERE userName = $1";
const getEmailId = "SELECT emailId FROM users WHERE emailId = $1";

module.exports = {
  createAccount,
  getUserName,
  getEmailId
};
