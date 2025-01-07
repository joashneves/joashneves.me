export default async function Home(request, response) {
  try {
    const allowedMethods = ["GET"];
    if (!allowedMethods.includes(request.method)) {
      return response.status(404).json({
        Error: "End-point não encontrado",
      });
    }
    return response.status(200).json({
      "pt-br": {
        "titulo-home": "Olá mundo!",
        "primeira-linha-home":
          "Bem-vindo ao meu portfólio! Este é um blog simples (por enquanto) que criei para armazenar meus projetos e compartilhar meus posts. Senti a necessidade de ter um lugar para organizar melhor minhas ideias, então aqui estamos.",
        "segunda-linha-home":
          "Sinta-se à vontade para explorar e procurar por projetos e posts. Minhas redes sociais estão disponíveis para um contato mais direto. Caso encontre algo interessante ou tenha sugestões de melhoria para este site, estarei sempre disposto a ouvi-las.",
        "terceira-linha-home":
          "A propósito, acho legal falar um pouco sobre mim, né? Tipo, como e quando comecei a atuar nessa área de programação. Acho que, como muitos dos garotos que entram nessa área, eu sempre tive um grande interesse em jogos. Imagine para uma criança como deve ser incrível ter o próprio jogo.",
        "quarta-linha-home":
          "Até cheguei a procurar por alguns lugares ou outros, mas nunca descobri se foi limitação minha ou preguiça de aprender, rsrs. Aprendi um pouco da 'lógica' e como funcionava mais ou menos, mas ao crescer eu me perguntei: 'Cara, se eu com esse conhecimento posso fazer qualquer coisa, por que me limitar só a jogos?'",
        "quinta-linha-home":
          "Então, decidi que iria aprender um pouco de tudo. Olhei como funcionavam as estruturas de páginas da internet, procurei como criar um servidor, comecei a me interessar bastante por IAs e bots. Não sei, parece interessante. Imagine conversar com algo que não seja humano, mas que até certo nível te entenda. Parece comum, mas diferente.",
        "sexta-linha-home":
          "Bem, eu não iria aprender tudo sozinho. Digo, até daria, muitas pessoas fizeram isso, mas eu sempre quis me destacar, não de modo ruim ou egocêntrico, mas tipo, poder dizer 'eu sei fazer isso!' e realmente fazer. Então acabei entrando em uma faculdade para, sabe, melhorar meus conhecimentos e ter um norte ao final do curso.",
      },
    });
  } catch (error) {
    return response.status(500).json({
      Error: "error " + error,
    });
  }
}
