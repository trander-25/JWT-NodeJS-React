import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";
import db from "../models/index";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// create the connection, specify bluebird as Promise

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (username, email, password) => {
  let hashPassword = hashUserPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: password,
    });
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM user");
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM user WHERE id=?",
      [id]
    );
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM user WHERE id=?",
      [id]
    );
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};

const updateUserInfor = async (username, email, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "UPDATE user SET username=?, email=? WHERE id=?",
      [username, email, id]
    );
    return rows;
  } catch (err) {
    console.log(">>> check error: ", err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
