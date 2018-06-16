var express = require("express");
var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");
var exphbs  = require('express-handlebars');
var bodyParser = require("body-parser");

var app = express();

// Require our routes
var routes = require("./routes");

// Set up a static folder (public) for our web app
app.use(express.static("public"));

var app = express();
var PORT = process.env.PORT || 3000;


// Use bodyParser in our app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Designate our public folder as a static directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through our route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});


