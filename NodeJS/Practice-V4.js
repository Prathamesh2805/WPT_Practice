const helper = require("http");
const mysql = require("mysql2");

const app = helper.createServer((req, res) => {
  if (req.url.includes("employees")) 
    {
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root123",
      database: "temp_nodejs",
    });

    connection.connect();
    connection.query("select * from emp", (err, result) => {
      if (err == null) {
        var employeeInString = JSON.stringify(result);
        res.setHeader("content-type", "application/json");
        res.write(employeeInString);
        res.end();
      } 
      else 
        {
        res.setHeader("content-type", "application/json");
        res.write(`{"errorMessage" : "something went wrong!"}`);
        res.end();
      }
    });

    connection.end();
  } else {
    res.setHeader("content-type", "text/plain");
    res.write("Something went wrong");
    res.end();
  }
});

app.listen(4141, () => {
  console.log("Server Started on port no 4141");
});
