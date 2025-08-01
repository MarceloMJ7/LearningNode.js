const inquirer = require("inquirer");
const chalk = require("chalk");

inquirer
  .prompt([
    {
      name: "p1",
      message: "Qual é o seu nome?",
    },
    {
      type: "number",
      name: "p2",
      message: "Qual é a sua idade",
    },
  ])
  .then((result) => {
    const nome = result.p1;
    const idade = result.p2;
    if (!nome || !idade) {
      console.log(
        chalk.bgRed.white("O nome e a idade precisam ser preenchidos!")
      );
      return;
    }
    console.log(
      chalk.bgYellow.black(`Seu nome é ${nome} e você tem ${idade} anos.`)
    );
  })
  .catch((err) => {
    console.log(chalk.red("Ocorreu um erro:", err));
  });
