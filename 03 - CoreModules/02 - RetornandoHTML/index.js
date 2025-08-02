const http = require("http");
const porta = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Contenty-Type", "text/html");
  res.end("<h1>Olá, testando meu primeiro server</h1><p>TestandoAtt</p>");
});

server.listen(porta, () => {
  console.log("Servidor rodando");
});
