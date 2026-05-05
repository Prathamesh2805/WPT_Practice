const helper = require("http");

const app = helper.createServer((req, res) => {
  if (req.url.includes("employees")) {
    var employees = [
      { no: 11, name: "mahesh1", address: "pune1" },
      { no: 12, name: "mahesh2", address: "pune2" },
      { no: 13, name: "mahesh3", address: "pune3" },
      { no: 14, name: "mahesh4", address: "pune4" },
    ];

    var employeeInString = JSON.stringify(employees);
    res.setHeader("content-type", "application/json");
    res.write(employeeInString);
  } else if (req.url.includes("depts")) {
    res.setHeader("content-type", "text/html");
    res.write("<h1>Hello from departments</h1>");
  } else {
    res.setHeader("content-type", "text/plain");
    res.write("Something went wrong");
  }

  res.end();
});

app.listen(4141, () => {
  console.log("Server Started on port no 4141");
});
