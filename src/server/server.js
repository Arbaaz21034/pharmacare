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

// embed query 2
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

/*
OLAP QUERY 1
Find the total revenue for each month in the past year and a super-aggregate row with the overall revenue:
*/
app.get("/api/report/1", (req, res) => {
  console.log("[GET] /api/report/1");
  const query = `SELECT 
      DATE_FORMAT(o_date, '%Y-%m') as month,
      SUM(m_price * m_quantity) as revenue,
      GROUPING(o_date) as is_super_aggregate
    FROM 
      ordered_medicines 
      JOIN medicine ON ordered_medicines.m_id = medicine.m_id 
      JOIN order_detail ON ordered_medicines.o_id = order_detail.o_id
    WHERE 
      o_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR) AND CURRENT_DATE()
    GROUP BY 
      month, o_date WITH ROLLUP
    HAVING is_super_aggregate = 1`;

  dbConn.query(query, (error, queryResult) => {
    if (error) {
      throw error;
    } else {
      res.send({
        success: true,
        message: "Fetched report 1",
        data: queryResult,
      });
    }
  });
});

/*
OLAP QUERY 2
Show the total revenue generated by each category of medicine in the last 6 months, including a summary row that shows the overall total revenue.
*/
app.get("/api/report/2", (req, res) => {
  console.log("[GET] /api/report/2");
  const query = `SELECT 
      m_category, 
      DATE_FORMAT(o_date, '%Y-%m') AS month, 
      SUM(m_price * m_quantity) AS revenue 
    FROM 
      ordered_medicines 
      JOIN medicine ON ordered_medicines.m_id = medicine.m_id 
      JOIN order_detail ON ordered_medicines.o_id = order_detail.o_id 
    WHERE 
      o_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 MONTH) AND NOW() 
    GROUP BY 
      m_category, 
      month WITH ROLLUP`;

  dbConn.query(query, (error, queryResult) => {
    if (error) {
      throw error;
    } else {
      res.send({
        success: true,
        message: "Fetched report 2",
        data: queryResult,
      });
    }
  });
});

/*
OLAP QUERY 3
Show the total revenue for each customer status and also the overall revenue
*/
app.get("/api/report/3", (req, res) => {
  console.log("[GET] /api/report/3");
  const query = `SELECT 
      IFNULL(c_status, 'Total') AS customer_status, 
      SUM(m_price * m_quantity) AS revenue 
    FROM 
      customer_orders 
      JOIN ordered_medicines ON customer_orders.o_id = ordered_medicines.o_id 
      JOIN medicine ON ordered_medicines.m_id = medicine.m_id 
      JOIN customer ON customer_orders.c_id = customer.c_id 
    GROUP BY 
      c_status WITH ROLLUP`;

  dbConn.query(query, (error, queryResult) => {
    if (error) {
      throw error;
    } else {
      res.send({
        success: true,
        message: "Fetched report 3",
        data: queryResult,
      });
    }
  });
});

/*
OLAP QUERY 4
Show the total revenue generated by each customer in each month of the last year, including a summary row that shows the overall total revenue for all customers in each month.
*/
app.get("/api/report/4", (req, res) => {
  console.log("[GET] /api/report/4");
  const query = `SELECT 
      customer.c_id, 
      DATE_FORMAT(o_date, '%Y-%m') AS month, 
      SUM(m_price * m_quantity) AS revenue 
    FROM 
      customer 
      JOIN customer_orders ON customer.c_id = customer_orders.c_id 
      JOIN order_detail ON customer_orders.o_id = order_detail.o_id 
      JOIN ordered_medicines ON ordered_medicines.o_id = order_detail.o_id 
      JOIN medicine ON ordered_medicines.m_id = medicine.m_id 
    WHERE 
      o_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW() 
    GROUP BY 
      customer.c_id, 
      month WITH ROLLUP`;

  dbConn.query(query, (error, queryResult) => {
    if (error) {
      throw error;
    } else {
      res.send({
        success: true,
        message: "Fetched report 4",
        data: queryResult,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log("[+] Server running on port", PORT);
});
