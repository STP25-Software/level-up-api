import  express  from "express";
import { userRouter } from "./Routers/users";
import {response,Request,NextFunction } from "express";
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

require("dotenv").config();

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use(express.json());
app.use("/api/registrations", userRouter);



//health end point
app.use("/api/health", (req, res) => {
    res.send({ status: "ok" });
})
app.use((err: any, req: any, res: any, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging

  // If the error has a status code, use it. Otherwise, default to 500.
  const statusCode = err.statusCode || 500;

  // Send the error response
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});
app.listen(3000, () => console.log("Server started on port 3000"));
