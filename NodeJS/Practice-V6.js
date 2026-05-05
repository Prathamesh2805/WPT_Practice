const express = require("express");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root123",
  database: "temp_nodejs",
});

connection.connect((err) => {
  if (err) console.error("Error connecting to DB:", err);
  else console.log("Connected to MySQL database");
});

const app = express();
app.use(express.json());

app.get("/employees", (req, res) => {
  connection.query("select * from emp", (err, result) => {
    res.setHeader("content-type", "application/json");
    if (err == null) {
      res.send(JSON.stringify(result));
    } else {
      res.send(JSON.stringify(err));
    }
  });
});

app.get("/employees/:id", (req, res) => {
  connection.query(
    `select * from emp where id = ${req.params.id}`,
    (err, result) => {
      res.setHeader("content-type", "application/json");
      if (err == null) {
        res.send(JSON.stringify(result));
      } else {
        res.send(JSON.stringify(err));
      }
    },
  );
});

app.post("/employees", (req, res) => {
  var queryText = `insert into emp (name, address) values ('${req.body.name}','${req.body.address}')`;

  connection.query(queryText, (err, result) => {
    res.setHeader("content-type", "application/json");
    if (err == null) {
      res.send(JSON.stringify(result));
    } else {
      res.send(JSON.stringify(err));
    }
  });
});

app.put("/employees/:id", (req, res) => {
  var putQuery = `update emp set name = '${req.body.name}', address = '${req.body.address}' where id = ${req.params.id}`;
  connection.query(putQuery, (err, result) => {
    res.setHeader("content-type", "application/json");
    if (err == null) {
      res.send(JSON.stringify(result));
    } else {
      res.send(JSON.stringify(err));
    }
  });
});

app.delete("/employees/:id", (req, res) => {
  var deleteQuery = `delete from emp where id = ${req.params.id}`
  connection.query(deleteQuery, (err, result)=>{
    res.setHeader('content-type', 'application/json')
    if(err==null){
      res.send(JSON.stringify(result))
    }
    else
    {
      res.send(JSON.stringify(err))
    }
  })
  
});

app.listen(4141, () => {
  console.log("Server listening on port no 4141");
});
