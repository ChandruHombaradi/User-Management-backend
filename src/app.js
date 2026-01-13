const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./src/swagger.yaml");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => res.send("API Running ✅"));

module.exports = app;
