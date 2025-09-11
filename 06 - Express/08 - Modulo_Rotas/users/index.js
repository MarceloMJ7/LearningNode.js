const express = require('express');
const router = express.Router();
const path = require('path');
const basePath = path.join(__dirname, '../templates');

// Não precisa deste middleware aqui, o arquivo principal já cuida disso
// router.use(express.json()) 

router.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

router.post('/save', (req, res) => {
  console.log(req.body); // Agora isso vai funcionar!

  const name = req.body.name;
  const age = req.body.age;

  console.log(`O seu nome é ${name} e sua idade é ${age}`);
  res.send('<h1>Usuário salvo com sucesso!</h1>'); // É bom enviar uma resposta
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Buscando o usuário ${id}`);
  res.sendFile(`${basePath}/users.html`);
});

module.exports = router;