export default async function Home(request, response) {
  try {
    const allowedMethods = ["GET"];
    if (!allowedMethods.includes(request.method)) {
      return response.status(404).json({
        error: "Método não permitido",
      });
    }
    return response.status(200).json([
      {
        title: "Typegator",
        subTitle: "Um motor de busca livre",
        content:
          "O objetivo do projeto no inicio foi criar um site fullstack em 7 dias, a ideia do projeto foi tentar criar um motor de busca, aonde as pessoa podem compartilhar seus links e outras pessoas podem votar para que aquele link possa aparecer primeiro que os outros nas pesquisas, fazendo assim que o usuario possa compartilhar seus links de nicho",
        image:
          "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ndqf644tuurvemtxlyf6gadp/bafkreia6kpqucarsnx5ny7j2gkdec3n2zrj4pr2jqm7f7mubwr3xlvcvh4@jpeg",
        alt: "Print do site",
        repo: "https://github.com/joashneves/typegator",
        projeto: "https://typergator.squareweb.app/",
      },
      {
        title: "Skalart",
        subTitle: "Um bot do discord de diversão",
        content:
          "Um bot do discord que tem como objetivo diversificar a exeperiencia dos servidores, seja com uma administração mais elaborada, ou com entretenimento com um jogo de advinhação utilizando a API que criei de retorna personagens aleatorios, ela tambem possui uma funcionalidade que permite comunicações entre diferentes servidores, alem de sistema de tiket e outras configurações com /ajuda",
        image:
          "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ndqf644tuurvemtxlyf6gadp/bafkreidesoznunsy7d4vli4tv5gv5i7a7osiywciqb5rfigbnbyewxgns4@jpeg",
        alt: "Print do bot",
        repo: "https://github.com/joashneves/SkalartBot",
        projeto:
          "https://discord.com/oauth2/authorize?client_id=1025176642236203118&scope=bot&permissions=8",
      },
      {
        title: "Email's bot",
        subTitle: "Um bot do discord",
        content:
          "Um bot do discord que envia emails, a funcionalidade dele é escrever um post e ele vai enviar esse post para todos os servidores que ele estiver, caso a pessoa siga a outra pessoa, ela vai receber esse post no privado, sempre tendo a opção de deixar se seguir, ou seguir a pessoa, alem de poder mostrar quantas pessoas o perfil esta sendo seguido, é necessario esta em um servidor registrado",
        image:
          "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ndqf644tuurvemtxlyf6gadp/bafkreiea4qm5zojtxqdo2rm3laydtdrx6qgm3fxxpg247mwwmf7jp45wxa@jpeg",
        alt: "Print do bot",
        repo: "https://github.com/joashneves/botEmailDiscord",
        projeto:
          "https://discord.com/oauth2/authorize?client_id=1337970488877645855&scope=bot&permissions=8",
      },
      {
        title: "Api de personagens",
        subTitle: "Uma API que retorna personagens aleatorios",
        content:
          "Uma API que retona varios personagens aleatorios gratuitamente, alem de voce tambem conseguir baixar as imagens desse personagem, e mostrar a franquia que o personagem aparece, essa API atualmente esta sendo usado no meu bot, e ligada a um front end de painel de controle para outras pessoas cadastrarem os personagens.",
        image:
          "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ndqf644tuurvemtxlyf6gadp/bafkreifnxezncratnluvqrhpfbuug3x57oqn6oldsg26cvskwrra3xmcny@jpeg",
        alt: "Print da resposta da api",
        repo: "https://github.com/joashneves/ApiPersonagens",
        projeto: "https://personagensaleatorios.squareweb.app/api/Personagems",
      },
      {
        title: "Ominigun",
        subTitle: "Um pequeno jogo feito com game maker",
        content:
          "Meu jogo feito no game maker studio 2, sendo esse um jogo que a ideia é o personagem ser o mais frenetico possivel, com varias coisas acontecendo na tela, ele possui 3 levels, e 3 bosses varias armas com efeitos diferente, sendo um shooter.  ",
        image:
          "https://img.itch.zone/aW1hZ2UvMjQ4MzA5MC8xNDc0NzAwNC5wbmc=/original/Qxqswc.png",
        alt: "Print do menu do meu jogo",
        repo: "https://github.com/joashneves/ominigun",
        projeto: "https://joashneves.itch.io/ominigun",
      },
    ]);
  } catch (error) {
    return response.status(500).json({
      error: "Erro: " + error.message,
    });
  }
}
