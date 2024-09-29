const express = require("express")
const app = express();
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
require("dotenv").config();

const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = process.env.PORT || 3300;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
