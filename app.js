var http = require("http");
var fs = require("fs");
const url = require("url");
const op = require("./calc.js");
const querystring = require("querystring");
http
  .createServer(function (req, res) {
    console.log("Server is running...");
    if (req.url == "/") {
      fs.readFile("calc.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      const query = url.parse(req.url).query;
      a = querystring.parse(query)["a"];
      b = querystring.parse(query)["b"];
      console.log(a, b);
      const path = url.parse(req.url).pathname;
      console.log(path);
      if (path == "/calc/add") {
        c = op.add(a, b);
        console.log(c);
        res.write("<h1>ADDITION OF "+a+" + "+b+" : " + c + "</h1>");
        res.end();
      } else if (path == "/calc/sub") {
        c = op.sub(a, b);
        res.write("<h1>SUBTRACTION OF "+a+" - "+b+" : " + c + "</h1>");
        res.end();
      } else if (path == "/calc/mul") {
        c = op.mul(a, b);
        res.write("<h1>MULTIPLICATION OF "+a+" * "+b+" : " + c + "</h1>");
        res.end();
      } else {
        c = op.div(a, b);
        res.write("<h1>DIVISION OF "+a+" / "+b+" : " + c + "</h1>");
        res.end();
      }
    }
  })
  .listen(7000);
  console.log("Server started running on the port no 7000");
