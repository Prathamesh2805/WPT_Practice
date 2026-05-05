const express = require("express");

const app = express();

app.get("/employees", (req, res) => {
  // select query
  res.send("Reply from server: Get request recieved on server!");
});

app.post("/employees", (req, res) => {
  // insert query
  res.send("Reply from server: Post request recieved on server!");
});

app.put("/employees", (req, res) => {
  //update query
  res.send("Reply from server: Put request recieved on server!");
});

app.delete("/employees", (req, res) => {
  //delete query
  res.send("Reply from server: Delete request recieved on server!");
});


app.listen(4141, ()=>{console.log("Server listening on port no 4141")})