const express = require("express");
const mysql = require("mysql2");
const config = require("config");

const app = express.Router();

const dbConnectionDetails = {
  host: config.get("myServer"),
  port: config.get("myPort"),
  user: config.get("myUsername"),
  password: config.get("myPassword"),
  database: config.get("myDatabase"),
};

app.get("/", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query(`select * from emp`, (err, result) => {
    if (err == null) {
      res.json(result);
      // console.log(result);
    } else {
      res.json(err);
      // console.log(err);
    }
  });
  connection.end();
});

app.post("/", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query(
    `insert into emp (name, address) values('${req.body.name}', '${req.body.address}')`,
    (err, result) => {
      if (err == null) {
        res.json(result);
      } else {
        res.json(err);
      }
      connection.end();
    },
  );
  // console.log("Post employee request received");
});

app.put("/:no", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query(
    `update emp set name = '${req.body.name}', address = '${req.body.address}' where no = ${req.params.no}`,
    (err, result) => {
      if (err == null) {
        res.json(result);
      } else {
        res.json(err);
      }
      connection.end();
    },
  );
});

app.delete("/:no", (req, res) => {
  const connection = mysql.createConnection(dbConnectionDetails);
  connection.connect();
  connection.query(
    `delete from emp where no = ${req.params.no}`,
    (err, result) => {
      if (err == null) {
        res.json(result);
      } else {
        res.json(err);
      }
      connection.end();
    },
  );
});


module.exports = app;
