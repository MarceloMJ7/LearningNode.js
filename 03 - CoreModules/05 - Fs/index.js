const http = require("http");
const fs = require("fs");
const porta = 3000;

const server = http.createServer((req, res) => {
  fs.readFile("mensagem.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(porta, () => {
  console.log("Servidor rodando");
});
