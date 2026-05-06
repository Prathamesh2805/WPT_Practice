const express  = require ('express');
const mysql = require ('mysql2');
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


app.post("/", (req, res)=>{
res.send("Post employee request recived")
})

app.put("/", (req, res)=>{
res.send("Put employee request recived")
})

app.delete("/", (req, res)=>{
res.send("Delete employee request recived")
})


module.exports = app;