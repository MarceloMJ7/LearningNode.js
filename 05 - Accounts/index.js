//Modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");
//Modulos Internos
const fs = require("fs");
console.log(chalk.bgBlue.black("Bem vindo ao Banco de Gothan"));
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
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar nosso sistema"));
        process.exit();
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

//Depositar valor na conta
function deposit() {
  inquirer
    .prompt([
      {
        // CONFIRA ESTA LINHA:
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      // E CONFIRA ESTA LINHA:
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  const filePath = `accounts/${accountName}.json`;

  if (!fs.existsSync(filePath)) {
    console.log(chalk.bgRed.black("Esta conta não existe, escolha outro nome"));
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente!"));
    return deposit();
  }
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.green(`Foi depositado um valor de R$ ${amount} na sua conta`)
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual é o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }
      const accountData = getAccount(accountName);
      console.log(
        chalk.bgBlue.black(`O saldo da sua conta é de R$${accountData.balance}`)
      );
      operation();
    })
    .catch((err) => console.log(err));
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual é o nome da conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return withdraw();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          console.log(amount);
          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(chalk.bgRed.black("Tente novamente"));
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(
      chalk.bgRed.black(
        `Não é possível sacar esse valor no momento, você tem disponível R$${accountData.balance}`
      )
    );
    return withdraw();
  }
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.green(`Foi realizado um saque no valor de R$${amount} da sua conta`)
  );
  operation();
}
