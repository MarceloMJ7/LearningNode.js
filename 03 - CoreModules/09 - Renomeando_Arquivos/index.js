const fs = require("fs");

fs.rename("Ar.txt", "Fogo.txt", function (err) {
  if (err) {
    console.log("Não existe esse nome");
  } else {
    console.log("Arquivo Renomeado");
  }
});
