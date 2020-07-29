const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`listening at: http://localhost:${PORT}`);
});
