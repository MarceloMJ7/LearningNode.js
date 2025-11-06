// Importa os módulos necessários
const express = require("express");
const path = require("path");

// Importa o nosso módulo de rotas de usuários
const users = require("./users");

// Inicializa a aplicação Express
const app = express();
const port = 3000;

// Define o caminho base para a pasta de 'templates'
// __dirname é a pasta atual (onde o index.js está)
const basePath = path.join(__dirname, "templates");

// --- Configuração dos Middlewares (Executados em toda requisição) ---

// 1. Middleware para o Express entender dados de formulários (urlencoded)
app.use(
  express.urlencoded({
    extended: true,
  })
);

// 2. Middleware para o Express entender dados em formato JSON
app.use(express.json());

// 3. Middleware para servir arquivos estáticos (CSS, imagens, JS do cliente)
// Tudo que estiver na pasta 'public' será acessível diretamente pelo navegador
app.use(express.static("public"));

// --- Configuração das Rotas ---

// Usa o nosso roteador customizado para todas as rotas que começarem com /users
app.use("/users", users);

// Rota principal da aplicação (homepage)
app.get("/", (req, res) => {
  // Envia o arquivo index.html como resposta
  res.sendFile(path.join(basePath, "index.html"));
});

app.use(function (req, res, next) {
  res.status(404).sendFile(`${basePath}/404.html`);
});

// Inicia o servidor para ouvir na porta definida
app.listen(port, () => {
  console.log(
    `🚀 Servidor rodando na porta ${port}! Acesse http://localhost:3000`
  );
});
