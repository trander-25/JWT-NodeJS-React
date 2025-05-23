// Use for React
import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  return app.use("/api/v1/", router);
};

export default initApiRoutes;
