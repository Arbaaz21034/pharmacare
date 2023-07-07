const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 2003;
const app = express(PORT);

app.use(cors());
app.use(bodyParser.json());

myDatabase = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
};

const dbConn = mysql.createConnection(process.env.DATABASE_URL);

const pool = mysql.createPool(process.env.DATABASE_URL);

dbConn.connect((error) => {
  if (error) {
    console.error(`[x] Failed to connect to database ${myDatabase.database}`);
    throw error;
  }

  console.info(`[+] Connected to database ${myDatabase.database}`);
});

app.get("/", (req, res) => {
  res.send("Access not allowed to this page.");
});

app.get("/api/prescription", (req, res) => {
  console.log("[POST] /api/prescription");
  const u_id = parseInt(req.query.u_id);

  const query = `SELECT * FROM prescription as p JOIN prescribed_medicines as pm WHERE p.cus_id = ${u_id} and p.p_id = pm.p_id;`;
  dbConn.query(query, (error, queryResult) => {
    if (error) {
      throw error;
    }
    // get the medicines
    const medicinesInPrescription = queryResult.map((prescription) => {
      return {
        m_id: prescription.m_id,
        m_quantity: prescription.m_quantity,
      };
    });

    const medicineQuery = `SELECT * FROM medicine WHERE m_id IN (${medicinesInPrescription
      .map((medicine) => medicine.m_id)
      .join(",")})`;

    dbConn.query(medicineQuery, (error, medicineQueryResult) => {
      if (error) {
        throw error;
      }

      let counter = 0;
      const medicines = medicineQueryResult.map((medicine) => {
        const m_quantity = medicinesInPrescription[counter].m_quantity;
        counter++;
        return {
          m_id: medicine.m_id,
          m_name: medicine.m_name,
          m_category: medicine.m_category,
          m_price: medicine.m_price,
          m_quantity: m_quantity,
        };
      });
      res.send({
        success: true,
        message: "Successfully fetched prescription with medicines",
        data: medicines,
        p_id: queryResult[0].p_id,
      });
    });
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
                console.log("[!] Customer login");
                // unsafe code made for demo purposes, do not use in production
                res.send({
                  success: true,
                  message: "Successfully logged in as Customer",
                  loginAs: "customer",
                  userId: userId,
                  userName: user.u_name,
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

  if (category == "all") {
    const query = `SELECT * FROM medicine`;
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
    return;
  }

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

/*
TRIGGER QUERY 1
Trigger to update the stock of a medicine after a new order is placed
*/
app.get("/api/trigger/1", (req, res) => {
  console.log("[GET] /api/trigger/1");
  const query = `CREATE TRIGGER update_medicine_stock
    AFTER INSERT ON ordered_medicines
    FOR EACH ROW
    BEGIN
        UPDATE medicine
        SET m_stock = m_stock - NEW.m_quantity
        WHERE m_id = NEW.m_id;
    END`;

  dbConn.query(query, (error, queryResult) => {
    if (error) {
      if (error.code == "ER_TRG_ALREADY_EXISTS") {
        res.send({
          success: false,
          message: "Trigger 1 already exists",
        });
      } else {
        throw error;
      }
    } else {
      res.send({
        success: true,
        message:
          "Created trigger 1 which updates the stock of a medicine after a new order is placed",
      });
    }
  });
});

/*
TRIGGER QUERY 2
Trigger to check the stock of a medicine before inserting an order
*/
app.get("/api/trigger/2", (req, res) => {
  console.log("[GET] /api/trigger/2");
  const query = `CREATE TRIGGER check_medicine_stock
    BEFORE INSERT ON ordered_medicines
    FOR EACH ROW
    BEGIN
        DECLARE current_stock INTEGER;
        SELECT m_stock INTO current_stock FROM medicine WHERE m_id = NEW.m_id;
        IF current_stock < NEW.m_quantity THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not enough stock for this medicine';
        END IF;
    END`;

  dbConn.query(query, (error, queryResult) => {
    if (error) {
      if (error.code == "ER_TRG_ALREADY_EXISTS") {
        res.send({
          success: false,
          message: "Trigger 2 already exists",
        });
      } else {
        throw error;
      }
    } else {
      res.send({
        success: true,
        message:
          "Created trigger 2 which checks the stock of a medicine before inserting an order",
      });
    }
  });
});

/*
  Example request: localhost:2003/api/order?order_id=1000&medicine_id=240&medicine_quantity=10000
  Example request: localhost:2003/api/order?order_id=3&medicine_id=240&medicine_quantity=5
  Use this to test trigger 1 & 2
*/
app.get("/api/order", (req, res) => {
  console.log("[GET] /api/order with data");

  const orderId = parseInt(req.query.order_id);
  const medicineId = parseInt(req.query.medicine_id);
  const medicineQuantity = parseInt(req.query.medicine_quantity);

  const query = `insert into ordered_medicines (o_id, m_id, m_quantity) values (${orderId}, ${medicineId}, ${medicineQuantity})`;

  dbConn.query(query, (error, queryResult) => {
    if (error) {
      if (error.sqlState == "45000") {
        let responseObj = {
          success: false,
          message: error.message,
          queryData: {
            orderId,
            medicineId,
            medicineQuantity,
          },
        };
        console.log("[TRIGGER] /api/order: " + error.message);
        res.send(responseObj);
      } else {
        console.error(error);
        res.send({
          success: false,
          message: error,
        });
      }
    } else {
      console.log(
        "[TRIGGER] /api/order:  Created requested order and updated medicine stock"
      );

      res.send({
        success: true,
        message: "Created requested order",
        queryData: {
          orderId,
          medicineId,
          medicineQuantity,
        },
      });
    }
  });
});

///////////////////////////
///////////////////////////
///////////////////////////

const transaction1 = (prescriptionID, stock_inc, price_inc, res) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject("Error occurred while getting the connection");
      }
      return connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return reject("Error occurred while creating the transaction");
        }
        return connection.execute(
          `
          UPDATE medicine
SET m_stock = m_stock + ${stock_inc}, m_price = m_price * (100 + ${price_inc}) / 100
WHERE m_id IN (
  SELECT m_id
  FROM prescribed_medicines
  WHERE p_id = ${prescriptionID}
);
`,
          (err) => {
            console.log(err);
            if (err) {
              return connection.rollback(() => {
                connection.release();
                return reject("UPDATING medicine table failed", err);
              });
            }
            return connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  return reject("Transaction commit failed");
                });
              }
              console.log("Transaction 1 completed");
              connection.release();
              return resolve("Transaction 1 completed");
            });
          }
        );
      });
    });
  });
};

const transaction2 = (prescriptionID, m_id, m_quantity, res) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject("Error occurred while getting the connection");
      }
      return connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return reject("Error occurred while creating the transaction");
        }
        return connection.execute(
          `
UPDATE prescribed_medicines
SET m_quantity = ${m_quantity}
WHERE p_id = ${prescriptionID} and m_id = ${m_id};
`,
          (err) => {
            console.log(err);
            if (err) {
              return connection.rollback(() => {
                connection.release();
                return reject(
                  "UPDATING prescribed_medicines table failed",
                  err
                );
              });
            }
            return connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  return reject("Transaction commit failed");
                });
              }
              console.log("Transaction 2 completed");
              connection.release();
              return resolve("Transaction 2 completed");
            });
          }
        );
      });
    });
  });
};
const transaction3 = (prescriptionID, res) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject("Error occurred while getting the connection");
      }
      return connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return reject("Error occurred while creating the transaction");
        }
        return connection.execute(
          `
            INSERT INTO order_detail (o_total, o_address, o_date)
            VALUES (0, '<order_address>', NOW());
          `,
          (err) => {
            console.log(err);
            if (err) {
              return connection.rollback(() => {
                connection.release();
                return reject("UPDATING order_detail table failed", err);
              });
            }

            return connection.execute(
              `
                SET @order_id = LAST_INSERT_ID();
              `,
              (err) => {
                console.log(err);
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    return reject("SETTING @order_id failed", err);
                  });
                }

                return connection.execute(
                  `
                INSERT INTO ordered_medicines (o_id, m_id, m_quantity)
                SELECT @order_id, pm.m_id, pm.m_quantity
                FROM prescribed_medicines pm
                WHERE pm.p_id = ${prescriptionID};
                  `,
                  (err) => {
                    console.log(err);
                    if (err) {
                      return connection.rollback(() => {
                        connection.release();
                        return reject(
                          "UPDATING ordered_medicine table failed",
                          err
                        );
                      });
                    }

                    return connection.execute(
                      `
                    UPDATE medicine m
                    INNER JOIN prescribed_medicines pm ON m.m_id = pm.m_id
                    SET m.m_stock = m.m_stock - pm.m_quantity
                    WHERE pm.p_id = ${prescriptionID};
                      `,
                      (err) => {
                        console.log(err);
                        if (err) {
                          return connection.rollback(() => {
                            connection.release();
                            return reject(
                              "UPDATING medicine table failed",
                              err
                            );
                          });
                        }

                        return connection.execute(
                          `
                            UPDATE order_detail
                            SET o_total = (
                              SELECT SUM(m.m_price * pm.m_quantity)
                              FROM prescribed_medicines pm
                              INNER JOIN medicine m ON pm.m_id = m.m_id
                              WHERE pm.p_id = ${prescriptionID}
                            )
                            WHERE o_id = @order_id;
                          `,
                          (err) => {
                            console.log(err);
                            if (err) {
                              return connection.rollback(() => {
                                connection.release();
                                return reject(
                                  "UPDATING order_detail table failed",
                                  err
                                );
                              });
                            }

                            return connection.commit((err) => {
                              if (err) {
                                return connection.rollback(() => {
                                  connection.release();
                                  return reject(
                                    "Error occurred while committing the transaction"
                                  );
                                });
                              }
                              console.log("Transaction 3 completed");
                              connection.release();
                              return resolve("Transaction 3 completed");
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  });
};

// for demo: http://localhost:2003/api/transaction/1?p_id=1&stock_inc=100&price_inc=5
app.get("/api/transaction/1", async (req, res) => {
  console.log("[GET] /api/transaction/1");
  const prescriptionID = parseInt(req.query.p_id);
  const stock_inc = parseFloat(req.query.stock_inc);
  const price_inc = parseFloat(req.query.price_inc);

  transaction1(prescriptionID, stock_inc, price_inc, res)
    .then((data) => {
      console.log(data);
      res.send({
        success: true,
        message: "Transaction 1 completed",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: err,
      });
    });
});

// for demo: http://localhost:2003/api/transaction/2?p_id=1&m_id=244&m_quantity=5
app.get("/api/transaction/2", async (req, res) => {
  console.log("[GET] /api/transaction/2");
  const prescriptionID = parseInt(req.query.p_id);
  const m_id = parseInt(req.query.m_id);
  const m_quantity = parseInt(req.query.m_quantity);

  transaction2(prescriptionID, m_id, m_quantity, res)
    .then((data) => {
      console.log(data);
      res.send({
        success: true,
        message: "Transaction 2 completed",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: err,
      });
    });
});

// for demo: http://localhost:2003/api/transaction/3?p_id=1
// for demo: http://localhost:2003/api/transaction/3?p_id=4
app.get("/api/transaction/3", async (req, res) => {
  console.log("[GET] /api/transaction/3");
  const prescriptionID = parseInt(req.query.p_id);

  transaction3(prescriptionID, res)
    .then((data) => {
      console.log(data);
      res.send({
        success: true,
        message: "Transaction 3 completed",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: err,
      });
    });
});

app.listen(PORT, () => {
  console.log("[+] Server running on port", PORT);
});
