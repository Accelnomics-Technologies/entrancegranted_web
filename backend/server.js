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
var AWS = require('aws-sdk');
const { OpenAI } = require('openai');
const fs = require('fs');
const { getJSONFromImage } = require('./utils/json_from_image'); // Assuming your function is named processData and is in utils.js
const multer = require('multer');
const upload = multer(); // Initialize multer
const {ticketSchema} = require("./models/tickets")

mongoose.connect(process.env.DB, {
  autoIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log(`MongoDB Connected`);
});

mongoose.connection.on("error", (error) => {
  console.log(`Database not working!!!: ${error}`, "error");
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

// Define a route for POST API
app.post("/api/get_json" ,async (req, res) => {

  const processedData = await getJSONFromImage(req?.files?.imagePath?.tempFilePath);

  await ticketSchema.create({
    sportName:processedData.exact_sport_name,
    eventName:processedData.event_name_or_league_name,
    homeTeam:processedData.teams_played.home,
    awayTeam:processedData.teams_played.away,
    venue:processedData.venue,
    price:processedData.price,
    date:processedData.date,
    time:processedData.time,
    imageLocation:req?.files?.imagePath?.tempFilePath,
    gameDetails:processedData.Memorable_Moments
  })

  
  res.status(200).json({ message: 'Data processed successfully',processedData });
});

//routes
app.use("/api", apiRoutes);

// Send back a 404 error for any unknown api request
app.use("*", (req, res) => errorHandler(res, "API Not Found", 404));

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
