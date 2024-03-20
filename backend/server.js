require("dotenv").config();

const express = require("express");
const app = express();
const helmet = require("helmet");
const volleyball = require("volleyball");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const { errorHandler } = require("./utils");
const apiRoutes = require("./routes/index");

mongoose.connect(process.env.DB, {
  autoIndex: true,
});

mongoose.connection.on("connected", () => {
  consoleLog(`MongoDB Connected`);
});

mongoose.connection.on("error", (error) => {
  consoleLog(`Database not working!!!: ${error}`, "error");
});

const port = process.env.PORT || 4001;

// Mongoose Debug Mode
mongoose.set("debug", process.env.NODE_ENV !== "production");

const originLocal = ["http://localhost:3000"];

//middlewares
app.use(volleyball);
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(express.json({ limit: "100mb", extended: true }));
app.use(
  express.urlencoded({ extended: true, limit: "1mb", parameterLimit: 100000 })
);
app.use(helmet());

app.use(
  cors({
    origin: originLocal,
    credentials: true,
  })
);

//routes
app.use("/api", apiRoutes);

// Send back a 404 error for any unknown api request
app.use("*", (req, res) => errorHandler(res, "API Not Found", 404));

server.listen(port, () => {
  consoleLog(`Server running on port: ${port}`);
});
