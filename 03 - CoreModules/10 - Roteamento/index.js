const http = require("http");
const fs = require("fs");
const url = require("url");

const porta = 3000;

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = q.pathname.substring(1);

  // Verifica se o arquivo existe e se a URL termina com .html
  if (filename.includes(".html")) {
    // fs.readFile precisa de um callback para lidar com o erro ou sucesso
    fs.readFile(filename, (err, data) => {
      if (err) {
        // Se houver um erro (ex: arquivo não encontrado), envia um 404
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 Not Found</h1>");
        return res.end();
      }
      // Se o arquivo for encontrado, envia o conteúdo
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    // Se a URL não termina com .html, envia uma mensagem de erro ou redireciona
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write("URL inválida ou não é um arquivo HTML.");
    return res.end();
  }
});

// O server.listen deve ser chamado apenas uma vez, fora da função createServer
server.listen(porta, () => {
  console.log("Servidor rodando na porta " + porta);
});
