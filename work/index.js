const directory = require("./mainMenu");
const connection = require("./config/connection");

connection.connect((err) => {
  if (err) throw err;
  directory();
});
