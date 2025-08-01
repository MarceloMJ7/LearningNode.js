const x = 10;

try {
  x = 11;
} catch (error) {
  console.log("Não pode alterar uma constante");
}
