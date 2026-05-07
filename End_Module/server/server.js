const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const dbDetails = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "nodejs",
};

const app = express();
app.use(express.json());
app.use(cors());



app.get("/employee", (req, res) => {
  const connection = mysql.createConnection(dbDetails);
  connection.connect();
  connection.query(`select * from emp`, (err, result) => {
    if (err == null) {
      console.log(result);
      res.json(result);
    } else {
      res.json(err);
    }
  });
  connection.end();
});

app.post("/employee", (req, res) => {
  const connection = mysql.createConnection(dbDetails);
  connection.connect();
  connection.query(
    `insert into emp (name, address) values('${req.body.name}','${req.body.address}')`,
    (err, result) => {
      if (err == null) {
        res.json(result);
      } else {
        res.json(err);
      }
    },
  );
  connection.end();
});

app.put("/employee/:no", (req, res) => {
  const connection = mysql.createConnection(dbDetails);
  connection.connect();
  connection.query(
    `update emp set name = '${req.body.name}',address = '${req.body.address}' where no = ${req.params.no}`,
    (err, result) => {
      if (err == null) {
        res.json(result);
      } else {
        res.json(err);
      }
    },
  );
  connection.end();
});

app.delete("/employee/:no", (req, res) => {
  const connection = mysql.createConnection(dbDetails);
  connection.connect();
  connection.query(
    `delete from emp where no = ${req.params.no}`,
    (err, result) => {
      if (err == null) {
        res.json(result);
      } else {
        res.json(err);
      }
    },
  );
  connection.end();
});


app.listen(4141, () => {
  console.log("server started on port no 4141");
});