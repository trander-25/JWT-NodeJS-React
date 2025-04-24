import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email/phone are existed
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "Email is already exist",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Phone number is already exist",
        EC: 1,
      };
    }

    // hash user password
    let hashPassword = hashUserPassword(rawUserData.password);

    // create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
    });

    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (e) {
    return {
      EM: "Somthing wrong in service...",
      EC: 1,
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        return {
          EM: "Ok", // error message
          EC: "0", // error code
          DT: "", // data
        };
      }
    }
    return {
      EM: "Your email/phone or password is not correct", // error message
      EC: "1", // error code
      DT: "", // data
    };
  } catch (e) {
    return {
      EM: "Error from service", // error message
      EC: "-1", // error code
      DT: "", // data
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
};
