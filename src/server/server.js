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
  dbConn.query(query, (error, queryResult) => {
    if (error) {
      throw error;
    }
    res.send(queryResult);
  });
});

// embedded query 1
app.post("/api/login", (req, res) => {
  console.log("[POST] /api/login");
  const { email, password } = req.body;

  const query = `SELECT * FROM user`;

  dbConn.query(query, (error, queryResult) => {
    if (error) {
      throw error;
    }

    const user = queryResult.find((user) => user.u_email == email);

    if (user) {
      const userId = user.u_id;
      if (user.u_password == password) {
        console.log(`[+] User ${user.u_id} logged in`);
        const doctorQuery = `SELECT * FROM doctor WHERE d_id = ${userId}`;

        dbConn.query(doctorQuery, (error, doctorQueryResult) => {
          if (error) {
            throw error;
          } else if (doctorQueryResult.length === 1) {
            console.log("[!] Doctor login");
            res.send({
              success: true,
              message: "Successfully logged in as Doctor",
              loginAs: "doctor",
            });
          } else {
            const customerQuery = `SELECT * FROM customer WHERE c_id = ${userId}`;
            dbConn.query(customerQuery, (error, customerQueryResult) => {
              if (error) {
                throw error;
              } else if (customerQueryResult.length === 1) {
                // user is a customer
                res.send({
                  success: true,
                  message: "Successfully logged in as Customer",
                  loginAs: "customer",
                });
              } else {
                // user is neither admin nor customer. huh?
              }
            });
          }
        });
      } else {
        res.send({
          success: false,
          message: "Invalid credentials",
        });
      }
    } else {
      const adminQuery = `SELECT * FROM admin`;
      dbConn.query(adminQuery, (error, adminQueryResult) => {
        if (error) {
          throw error;
        }

        const admin = adminQueryResult.find((admin) => admin.a_email == email);
        if (admin) {
          console.log("[!] Admin login");
          res.send({
            success: true,
            message: "Successfully logged in as Admin",
            loginAs: "admin",
          });
        } else {
          res.send({
            success: false,
            message: "Invalid credentials",
          });
        }
      });
    }
  });
});

app.get("/api/products/:category", (req, res) => {
  let { category } = req.params;
  const validCategories = {
    "pain-relief": "Pain relief",
    "allergy-relief": "Allergy relief",
    cholesterol: "Cholesterol management",
    diabetes: "Diabetes management",
    "blood-pressure": "Blood pressure management",
    antibiotics: "Antibiotics",
    "acid-reflux": "Acid reflux management",
    "cold-and-flu": "Cold and flu relief",
    digestive: "Digestive health",
  };
  console.log("[GET] /api/products/" + category);
  const categoryName = validCategories[category];

  if (validCategories[category]) {
    const query = `SELECT * FROM medicine WHERE m_category='${categoryName}'`;

    dbConn.query(query, (error, queryResult) => {
      if (error) {
        throw error;
      } else {
        res.send({
          success: true,
          message: "Successfully fetched products",
          products: queryResult,
        });
      }
    });
  } else {
    res.send({
      success: false,
      message: "Invalid category",
    });
  }
});

app.listen(PORT, () => {
  console.log("[+] Server running on port", PORT);
});
