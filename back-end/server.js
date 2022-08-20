const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

//app
app = express();
dotenv.config();

// Declare the middleware for the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'))
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Env: Develop Model -- Morgan is enabled ... ");
}

//loading environment variable
const port = process.env.PORT;
const database = process.env.DATABASE;

//connect to mongo database from environment variable
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // dbName: ''
  })
  .then(() => console.log("database is connected"));

// Event handlers for the connection
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
  process.exit(1);
});
db.once("open", () => {
  console.log(`Mongo connection started on ${db.host}: ${db.port}`);
});

// Start the server & listen for requests
app.set("port", port);
app.listen(port || 3000, () => {
  console.log(`Ther server is running on ${port}`);
});
