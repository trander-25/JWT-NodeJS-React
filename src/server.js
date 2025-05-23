import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import "dotenv/config";
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8081;

// config Cors
configCors(app);

// config view engine
configViewEngine(app);

// test connection DB
connection();

// config body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init web routes
initWebRoutes(app);
initApiRoutes(app);
app.listen(PORT, () => {
  console.log("Server is running on the port: " + PORT);
});
