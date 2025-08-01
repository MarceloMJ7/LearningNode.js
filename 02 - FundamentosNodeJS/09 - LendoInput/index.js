const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Qual é o seu nome? ", (nome) => {
  if (nome == "Marcelo") {
    console.log(`Seu nome é ${nome}`);
  } else {
    console.log(`Seu nome é estranho, nome legal mesmo é Marcelo`);
  }
  readline.close();
});
