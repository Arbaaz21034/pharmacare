const express = require("express");
const mysql = require("mysql");

const app = express(2003);

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678", // hardcoding it here instead of using a .env because I really don't care about security for this thing
  database: "pharmacare",
});

app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM user";
  dbConnection.query(query, (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log(results);
    res.send(results);
  });
});

const PORT = process.env.PORT || 2003;

app.listen(PORT, () => {
  console.log("[Express] Server running on port", PORT);
});
