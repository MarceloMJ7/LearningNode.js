const http = require("http");
const fs = require("fs");
const os = require("os");
const porta = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    const nameNewLine = name + "\r\n";
    fs.appendFile("Arquivo.txt", nameNewLine, function (err, data) {
      res.writeHead(302, {
        location: "/",
      });
      return res.end();
    });
  }
});

server.listen(porta, () => {
  console.log("Servidor rodando");
});
