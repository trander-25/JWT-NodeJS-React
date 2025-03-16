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
  // test relationship
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: { model: db.Group, attributes: ["name", "description"] },
    raw: true,
    nest: true,
  });

  let users = [];
  users = await db.User.findAll();
  return users;

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM user");
  //   return rows;
  // } catch (err) {
  //   console.log(">>> check error: ", err);
  // }
};

const deleteUser = async (id) => {
  await db.User.destroy({
    where: {
      id: id,
    },
  });
  // SELECT * FROM post WHERE authorId = 2;
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log(">>> check error: ", err);
  // }
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user.get({ plain: true });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "SELECT * FROM user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log(">>> check error: ", err);
  // }
};

const updateUserInfor = async (username, email, id) => {
  await db.User.update(
    { username: username, email: email },
    {
      where: {
        id: id,
      },
    }
  );
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user SET username=?, email=? WHERE id=?",
  //     [username, email, id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log(">>> check error: ", err);
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
