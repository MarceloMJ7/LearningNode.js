const fs = require("fs");
console.log("Início");

fs.writeFile("Arquivo.txt", "OI", function (err) {
  setTimeout(function () {
    console.log("Arquivo Criado");
  }, 1000);
});

console.log("Fim");
