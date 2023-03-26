const express = require("express");
const mysql = require("mysql2");

const app = express(2003);

myDatabase = {
  host: "localhost",
  user: "root",
  database: "pharmacare",
  password: "12345678", // hardcoding it here instead of using a .env because I really don't care about security for this thing
};

const dbConn = mysql.createConnection(myDatabase);

dbConn.connect((error) => {
  if (error) {
    console.error(`[x] Failed to connect to database ${myDatabase.database}`);
    throw error;
  }

  console.info(`[+] Connected to database ${myDatabase.database}`);
});

app.get("/api/users", (req, res) => {
  console.log("[GET] /api/users");
  const query = "SELECT * FROM user";
  dbConn.query(query, (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log(results);
    res.send(results);
  });
});

const PORT = process.env.PORT || 2003;

app.listen(PORT, () => {
  console.log("[+] Server running on port", PORT);
});
