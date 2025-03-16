import userService from "../service/userService";

const handleHomePage = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  userService.createNewUser(username, email, password);
  return res.redirect("/user");
};

const handleDeleteUser = (req, res) => {
  console.log(">>> check id: ", req.params.id);
  userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = {};
  userData = user;
  // if (user && user.length > 0) {
  //   userData = user[0];
  // }
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let id = req.body.id;
  await userService.updateUserInfor(username, email, id);
  return res.redirect("/user");
};

module.exports = {
  handleHomePage,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
