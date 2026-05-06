const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const employeesRoute = require("./routes/employees");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.url.includes("signin")) {
    next();
  } else {
    if (req.headers.authorization != undefined) {
      var authHeaderDetails = req.headers.authorization;
      //normally authHeaderDetails will hold token in below format
      //"bearer <tokens>"

      var tokenRecieved = authHeaderDetails.split(" ")[1];
      console.log("Token recieved is ", tokenRecieved);

      var secretKey = config.get("jwtSecretKey");
      var tokenDecrepted = jwt.verify(tokenRecieved, secretKey);

      if (tokenDecrepted.isValid == true){
        next();
      }
      else
      {
        response.json({errMsg:"Token is Invalid!"})
      }
    } else {
      res.json({ errMsg: "Token not found" });
    }
  }
});

app.use("/employees", employeesRoute);
app.use("/signin", authRoute);

app.listen(4141, () => {
  console.log("Server started on port 4141, visit http://localhost:4141/");
});
