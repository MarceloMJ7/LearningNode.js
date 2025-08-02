const http = require("http");
const porta = 3000;

const server = http.createServer((req, res) => {
  res.write("Hello, World");
  res.end();
});

server.listen(porta, () => {
  console.log("Servidor rodando");
});
