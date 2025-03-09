import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHomePage);

  router.get("/user", homeController.handleUserPage);

  return app.use("/", router);
};

export default initWebRoutes;
