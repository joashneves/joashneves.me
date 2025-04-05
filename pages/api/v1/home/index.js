export default async function Home(request, response) {
  try {
    const allowedMethods = ["GET"];
    if (!allowedMethods.includes(request.method)) {
      return response.status(404).json({
        error: "Método não permitido",
      });
    }
    return response.status(200).json({
      "pt-br": {
        "titulo-home": "Olá, mundo!",
        descricao: {
          introducao: {
            title: "Bem-vindo ao meu portfólio!",
            content:
              "Este é um blog simples (por enquanto) que criei para armazenar meus projetos e compartilhar meus posts. Senti a necessidade de ter um lugar para organizar melhor minhas ideias, então aqui estamos.",
          },
          construcao: {
            title: "Desculpe a bagunça!",
            content:
              "Esta e algumas das muitas paginas estão em construção, esse blog serve inicialmente para mostrar alguns de meus projetos e explicar seus funcionamentos, juntos com seu modo de uso, caso esteja curioso sintasse livre para explorar o que, que tenha por ai, mas caso voce ache legal, e queria que eu termine logo, me avise, quem sabe eu me animo a terminar mais rápido.",
          },
          exploracao: {
            title: "Sinta-se à vontade para explorar",
            content:
              "Explore projetos, posts e entre em contato através das minhas redes sociais. Se tiver sugestões para melhorar este site, estarei sempre aberto a ouvi-las.",
          },
          historia: {
            title: "A história por trás da programação",
            content:
              "Como muitos, meu interesse por programação começou com jogos. Imaginar ter meu próprio jogo sempre foi incrível. Decidi entrar nesse mundo e expandir meu conhecimento.",
          },
          aprendizado: {
            title: "Superando limitações",
            content:
              "Explorei muitas opções para aprender, mas com o tempo me perguntei: por que me limitar apenas aos jogos quando posso aprender mais? Decidi aprender um pouco de tudo.",
          },
          interesse: {
            title: "Aprender mais sobre tecnologias",
            content:
              "Esse é um blog para guardar as coisas que eu crio ou comentar as coisas que eu acho interressante compartilhar.",
          },
          futuro: {
            title: "O caminho para o futuro",
            content:
              "Eu sabia que não poderia aprender tudo sozinho, então entrei na faculdade para aprimorar meus conhecimentos e ter uma direção ao final do curso.",
          },
        },
      },
    });
  } catch (error) {
    return response.status(500).json({
      error: "Erro: " + error.message,
    });
  }
}
