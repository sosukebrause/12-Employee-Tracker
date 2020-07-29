const express = require("express");
const router = express.Router();

router.get("/api", (req, res) => {
  res.json("you succesfuly made a request to my api");
});

router.get("/api/all", (req, res) => {
  res.json("this came from the server");
});

router.post("/api/test", (req, res) => {
  res.json("this came from the server");
});

const todoArray = [];
router.post("/api/todo", (req, res) => {
  todoArray.push(req.body);
  console.log(todoArray);
  res.json(todoArray);
});
// /api/all

module.exports = router;
