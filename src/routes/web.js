import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWord);

  router.get("/about", (req, res) => {
    return res.send("sih");
  });

  return app.use("/", router);
};

export default initWebRoutes;
