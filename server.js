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


// // Retrieve data from the db
// app.get("/all", function(req, res) {
//   // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });

//   // Scrape data from one site and place it into the mongodb db
//   app.get("/scrape", function(req, res) {
//     // Make a request for the news section of `ycombinator`
//     request("https://www.nytimes.com/", function(error, response, html) {
//       // Load the html body from request into cheerio
//       var $ = cheerio.load(html);
//       // For each element with a "title" class
//       $(".title").each(function(i, element) {
//         // Save the text and href of each link enclosed in the current element
//         var title = $(element).children("a").text();
//         var link = $(element).children("a").attr("href");
  
//         // If this found element had both a title and a link
//         if (title && link) {
//           // Insert the data in the scrapedData db
//           db.scrapedData.insert({
//             title: title,
//             link: link
//           },
//           function(err, inserted) {
//             if (err) {
//               // Log the error if one is encountered during the query
//               console.log(err);
//             }
//             else {
//               // Otherwise, log the inserted data
//               console.log(inserted);
//             }
//           });
//         }
//       });
//     });
  
//     // Send a "Scrape Complete" message to the browser
//     res.send("Scrape Complete");
//   });
  
// // Start the server
// app.listen(3000, function() {
//   console.log("App running on port 3000!");
// });

// app.listen(PORT, function() {
//   console.log("App running on port " + PORT + "!");
// });

