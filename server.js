require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');



// Define middleware here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);
// Send every other request to the React app
// Define any API routes before this runs

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@ds143678.mlab.com:43678/heroku_b6hh732v",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
