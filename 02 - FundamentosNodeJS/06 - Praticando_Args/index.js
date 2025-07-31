//Módulo externo
const minimist = require("minimist");

//Módulo Interno
const soma = require("./soma").soma;
const args = minimist(process.argv.slice(2));

const a = parseInt(args["a"]);
const b = parseInt(args["b"]);

const resultado = soma(a, b);

console.log(`O primeiro número escolhido: ${a} 
  O segundo número escolhido foi: ${b}
  Resultado Final: ${resultado}`);
