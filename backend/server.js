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
app.use("/api", apiRoutes);

app.use(
  cors({
    origin: originLocal,
    credentials: true,
  })
);


app.post("/api" ,async (req, res) => {

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

// Define a route to get a single ticket by ID
app.get('/api/tickets', async (req, res) => {
  try {
    // Get the ticket ID from the request parameters
    const ticketId = req.query.ticket_id;

    // Find the ticket by ID in the MongoDB collection
    const ticket = await ticketSchema.findById(ticketId);

    // If the ticket is not found, return a 404 Not Found response
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // If the ticket is found, return it as a JSON response
    res.json(ticket);
  } catch (err) {
    // If an error occurs, return a 500 Internal Server Error response
    console.error('Error fetching ticket:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define a route for updating a ticket by ID
app.post('/api/update_tickets', async (req, res) => {
  try {
    // Get the ticket ID from the request parameters
    const ticketId = req.query.ticket_id;

    // Get the new data for the ticket from the request body
    const newData = {
      sportName: req.body.sportName,
      eventName: req.body.eventName,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      venue: req.body.venue,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time,
      imageLocation: req.body.imageLocation,
      gameDetails: req.body.gameDetails
    };

    // Update the ticket by ID in the MongoDB collection
    const ticket = await ticketSchema.findByIdAndUpdate(ticketId, newData, { new: true });

    // If the ticket is not found, return a 404 Not Found response
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // If the ticket is found and updated, return the updated ticket
    res.json(ticket);
  } catch (err) {
    // If an error occurs, return a 500 Internal Server Error response
    console.error('Error updating ticket:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post('/api/del_tickets', async (req, res) => {
  try {
    // Get the ticket ID from the request parameters
    const ticketId = req.query.ticket_id;

    // Delete the ticket by ID in the MongoDB collection
    const result = await ticketSchema.findByIdAndDelete(ticketId);

    // If the ticket is not found, return a 404 Not Found response
    if (!result) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // If the ticket is found and deleted, return a success message
    res.json({ message: 'Ticket successfully deleted' });
  } catch (err) {
    // If an error occurs, return a 500 Internal Server Error response
    console.error('Error deleting ticket:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Define a route to fetch all tickets
app.get('/api/all_tickets', async (req, res) => {
  try {
    // Fetch all tickets from the database
    const tickets = await ticketSchema.find({});
    res.json(tickets); // Send the tickets as JSON response
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//routes
app.use("/api", apiRoutes);

// Send back a 404 error for any unknown api request
app.use("*", (req, res) => errorHandler(res, "API Not Found", 404));

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
