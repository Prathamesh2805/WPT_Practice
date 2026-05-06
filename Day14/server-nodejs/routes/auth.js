const express = require("express");
const app = express.Router();
const jwt = require('jsonwebtoken')
const config = require('config')

app.post("/", (req, res) => {
  if (req.body.username == "test" && req.body.password == "test123") {
    const secretKey = config.get("jwtSecretKey");
    const payload = {
      username: req.body.username,
      role: "admin",
      tokenCreatedOn: "04:50PM|05052026",
      isValid: true,
    };

    const token = jwt.sign(payload, secretKey)
    res.json({"token":token})
    
  } else {
    res.json({ errMsg: "Invalid User!" });
  }
});

module.exports = app;
