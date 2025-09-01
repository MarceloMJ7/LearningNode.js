//Modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");
//Modulos Internos
const fs = require("fs");
console.log("!!!!!!!!!! ESTOU EXECUTANDO O ARQUIVO ATUALIZADO !!!!!!!!!!");
operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Criar Conta") {
        createAccount();
      }
    })
    .catch((err) => console.log(err));
}

//Criando uma conta
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco")); // <-- RE-DIGITE ESTA LINHA
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual é o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black.bold("Nome já existe, escolha outro nome")
        );
        buildAccount();
        return;
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        function (err) {
          console.log(err);
        }
      );
      console.log(chalk.bgGreen.black.bold("Conta Criada com sucesso"));
      operation();
    })
    .catch((err) => console.log(err));
}
