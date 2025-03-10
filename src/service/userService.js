import mysql from "mysql2";
import bcrypt from "bcryptjs";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);

  return hashPassword;
};

const createNewUser = (username, email, password) => {
  let hashPassword = hashUserPassword(password);

  // execute will internally call prepare and query
  connection.execute(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashPassword],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

module.exports = {
  createNewUser,
};
