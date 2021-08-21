// jshint esversion:6
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");


const router = require("./routes/index");

require("dotenv").config();
const app = express();

// config for Handlebars, View engine
app.engine(".hbs", exphbs({extname: ".hbs", defaultLayout: "main"}));
app.set("view engine", ".hbs");

/* MIDDLEWARES */
// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/contact", express.static(path.join(__dirname, "public")));

// Parse JSON data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes to different pages
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT} ...`);
});