import  express  from "express";
import { userRouter } from "./Routers/users";
import {response,Request,NextFunction } from "express";
require("dotenv").config();


const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/registrations", userRouter);


//health end point
app.use("/health", (req, res) => {
    res.send({ status: "ok" });
})

// Error handling middleware
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

// app
app.listen(process.env.PORT, 
  () => console.log(`Server started on port ${process.env.PORT}`));
