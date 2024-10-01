import  express  from "express";
import { db } from "./model/attendees";
import { Attendees } from "./model/attendees";
import { userRouter } from "./Routers/users";
import { adminRouter } from "./Routers/admin";

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

require("dotenv").config();

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


// const port = process.env.PORT || 3300;
// app.listen(port, () => {
// 	console.log(`Server is running on http://localhost:${port}`);
// });

app.use(express.json());
app.use("/api/registrations", userRouter);
app.use("/api/admin",adminRouter);


app.use("/api/health", (req, res) => {
    res.send({ status: "ok" });
})

app.listen(3000, () => console.log("Server started on port 3000"));
