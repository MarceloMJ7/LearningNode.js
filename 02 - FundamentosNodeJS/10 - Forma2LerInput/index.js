const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      name: "p1",
      message: "Qual é a sua nota?",
    },
    {
      name: "p2",
      message: "Qual é a segunda nota?",
    },
  ])
  .then((result) => {
    console.log(result);
    const media = (parseInt(result.p1) + parseInt(result.p2)) / 2;
    console.log(`Média: ${media}`);
  })
  .catch((err) => {
    console.log(err);
  });
