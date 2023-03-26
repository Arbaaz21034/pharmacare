const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 2003;
const app = express(2003);

app.use(cors());
app.use(bodyParser.json());

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
  dbConn.query(query, (error, data) => {
    if (error) {
      throw error;
    }
    res.send(data);
  });
});

// embedded query 1
app.post("/api/login", (req, res) => {
  console.log("[POST] /api/login");
  const { email, password } = req.body;

  const query = "SELECT * FROM user";
  dbConn.query(query, (error, data, field) => {
    if (error) {
      throw error;
    }

    const user = data.find((user) => user.u_email == email);

    if (user) {
      if (user.u_password == password) {
        // user exists and has given the correct password
        console.log(`[+] User ${user.u_id} logged in`);
        res.send({
          success: true,
          message: "Successfully logged in",
        });
      } else {
        res.send({
          success: false,
          message: "Incorrect password",
        });
      }
    } else {
      res.send({
        success: false,
        message: "This user does not exist",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("[+] Server running on port", PORT);
});
