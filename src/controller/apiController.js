import loginRegisterService from "../service/loginRegisterService";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test-api",
  });
};

const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters", // error message
        EC: "1", // error code
        DT: "", // data
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have length more than 3", // error message
        EC: "1", // error code
        DT: "", // data
      });
    }

    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: "", // data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server", // error message
      EC: "-1", // error code
      DT: "", // data
    });
  }
  console.log(req.body);
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: data.DT, // data
    });
  } catch (e) {
    return res.status(200).json({
      EM: "Error from server", // error message
      EC: "-1", // error code
      DT: "", // data
    });
  }
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
