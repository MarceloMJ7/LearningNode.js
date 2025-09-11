const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const users = require('./users');

// Middleware para ler o body - DEVE VIR ANTES DAS ROTAS
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// AQUI ESTÁ A CORREÇÃO PRINCIPAL: sem o './'
app.use('/users', users);

// Rota principal (não é afetada)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/index.html')); // Adicionado para ter uma resposta
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});