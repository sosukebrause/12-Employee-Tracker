const express = require("express");
const router = express.Router();
const connection = require("../connection");

router.get("/", (req, res) => {
  console.log("api hit");

  connection.query("SELECT * FROM todos", (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});
