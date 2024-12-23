const calculadora = require("../../models/calculadora.js");
// Testes para testar o jests
test("somar 2 + 2 retorna 4", () =>{
  const resulatado = calculadora.somar(2,2);
  expect(resulatado).toBe(4);
});

test("somar 5 + 100 retorna 5", () =>{
  const resulatado = calculadora.somar(5, 100);
  expect(resulatado).toBe(105);
});

test("espero que 1 seja 1", () => {
	expect(1).toBe(1);
});