import userService from "../service/userService";

const handleHomePage = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  userService.createNewUser(username, email, password);

  return res.send("ok bro");
};

module.exports = {
  handleHomePage,
  handleUserPage,
  handleCreateNewUser,
};
