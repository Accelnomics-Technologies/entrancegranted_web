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
const apiRoutes = require("./routes/index");

const path = require("path"); 
const { errorHandler } = require("./utils");
const { getTicketImage } = require("./controllers/admin/admin.controller");
const uploadsDirectory = path.join(__dirname, "..",'uploads');


mongoose.connect(process.env.DB, {
  autoIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log(`MongoDB Connected`);
});

mongoose.connection.on("error", (error) => {
  console.log(`Database not working!!!: ${error}`, "error");
});

const port = process.env.PORT || 3003;

// Mongoose Debug Mode
mongoose.set("debug", process.env.NODE_ENV !== "production");

const originLocal = ["http://localhost:3000","http://localhost:3003"];


//middlewares
app.use(volleyball);

app.use('/uploads', express.static(uploadsDirectory));
app.use(
  fileUpload({
    useTempFiles: true, // Enable temporary file creation
    tempFileDir: path.join(__dirname,"..", "..","uploads"), // Adjust the path as needed
  })
);

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

app.get("/ticket_image", getTicketImage);

//routes
app.use("/api", apiRoutes);

// Send back a 404 error for any unknown api request
app.use("*", (req, res) => errorHandler(res, "API Not Found", 404));

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
