const express = require("express");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root123",
  database: "temp_nodejs",
});

// Connect once when the server starts
connection.connect((err) => {
  if (err) console.error("Error connecting to DB:", err);
  else console.log("Connected to MySQL database");
});

const app = express();
app.use(express.json());

app.get("/employees", (req, res) => {
  // Just run the query; don't connect/end here
  connection.query("select * from emp", (err, result) => {
    res.setHeader("content-type", "application/json");
    if (err == null) {
      res.send(JSON.stringify(result));
    } else {
      res.status(500).send(JSON.stringify(err));
    }
  });
});

app.get("/employees/:id", (req, res) => {
  // Use ? to prevent SQL Injection
  connection.query(
    "select * from emp where id = ?", [req.params.id],
    (err, result) => {
      res.setHeader("content-type", "application/json");
      if (err == null) {
        res.send(JSON.stringify(result)); // Fixed typo here
      } else {
        res.status(500).send(JSON.stringify(err));
      }
    }
  );
});

// ... repeat same logic for POST (remove connect/end)

app.listen(4141, () => {
  console.log("Server listening on port no 4141");
});
