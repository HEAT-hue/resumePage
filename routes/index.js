// jshint esversion:6
const express = require("express");

const sendMail = require("../utils/sendMail");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/contact", (req, res) => {
  res.render("contact", {layout: "contact"});
  // res.send("Welcome to the contact page");
});

router.post("/contact", sendMail, (req, res) => {
  res.render("success", {layout: "success", user: req.body.name});
});

module.exports = router;