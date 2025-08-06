const fs = require("fs");
fs.unlink("Arquivo.txt", function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Arquivo Removido");
  }
});
