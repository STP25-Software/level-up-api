"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./Routers/users");
const admin_1 = require("./Routers/admin");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
require("dotenv").config();
const swaggerDocument = YAML.load("./swagger.yaml");
const app = (0, express_1.default)();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// const port = process.env.PORT || 3300;
// app.listen(port, () => {
// 	console.log(`Server is running on http://localhost:${port}`);
// });
app.use(express_1.default.json());
app.use("/api/registrations", users_1.userRouter);
app.use("/api/admin", admin_1.adminRouter);
app.listen(3000, () => console.log("Server started on port 3000"));
