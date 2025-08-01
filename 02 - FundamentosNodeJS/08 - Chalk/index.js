const chalk = require("chalk");
const nota = 5;

if (nota >= 7) {
  console.log(chalk.green("Parabéns! Você está aprovado"));
} else {
  console.log(chalk.bgRed.bold("Você está reprovado"));
}
