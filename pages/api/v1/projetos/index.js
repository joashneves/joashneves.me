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
          "https://cdn.discordapp.com/attachments/1252065348191129641/1357904652774936858/image.png?ex=67f1e6c1&is=67f09541&hm=8ce0ceba68dba596df4b59fe080ac9aade3efd9a1add88c66b52647cfa91ba6d&",
        alt: "Print do site",
        repo: "https://github.com/joashneves/typegator",
        projeto: "https://typergator.squareweb.app/",
      },
      {
        title: "Skalart",
        subTitle: "Um bot do discord de diversão",
        content: "Um bot do discord que tem como objetivo diversificar a exeperiencia dos servidores, seja com uma administração mais elaborada, ou com entretenimento com um jogo de advinhação utilizando a API que criei de retorna personagens aleatorios, ela tambem possui uma funcionalidade que permite comunicações entre diferentes servidores, alem de sistema de tiket e outras configurações com /ajuda",
        image:
          "https://cdn.discordapp.com/attachments/1252065348191129641/1357913471777247372/image.png?ex=67f1eef8&is=67f09d78&hm=cb41e4cec2d284a13470612ce648959cbef1eb7b4711e8b1d86c1710c5fc188b&",
        alt: "Print do bot",
        repo: "https://github.com/joashneves/SkalartBot",
        projeto: "https://discord.com/oauth2/authorize?client_id=1025176642236203118&scope=bot&permissions=8",
      },
      {
        title: "Email's bot",
        subTitle: "Um bot do discord",
        content: "Um bot do discord que envia emails, a funcionalidade dele é escrever um post e ele vai enviar esse post para todos os servidores que ele estiver, caso a pessoa siga a outra pessoa, ela vai receber esse post no privado, sempre tendo a opção de deixar se seguir, ou seguir a pessoa, alem de poder mostrar quantas pessoas o perfil esta sendo seguido, é necessario esta em um servidor registrado",
        image:
          "https://cdn.discordapp.com/attachments/1252065348191129641/1358087579861389542/image.png?ex=67f2911f&is=67f13f9f&hm=980876af6f49ac76a95454203bf25cdeec9f6470a4b13b133544153177d1cfaa&",
        alt: "Print do bot",
        repo: "https://github.com/joashneves/botEmailDiscord",
        projeto: "https://discord.com/oauth2/authorize?client_id=1337970488877645855&scope=bot&permissions=8",
      },
      {
        title: "Api de personagens",
        subTitle: "Uma API que retorna personagens aleatorios",
        content: "Uma API que retona varios personagens aleatorios gratuitamente, alem de voce tambem conseguir baixar as imagens desse personagem, e mostrar a franquia que o personagem aparece, essa API atualmente esta sendo usado no meu bot, e ligada a um front end de painel de controle para outras pessoas cadastrarem os personagens.",
        image:
        "https://cdn.discordapp.com/attachments/1252065348191129641/1358086595152056461/image.png?ex=67f29034&is=67f13eb4&hm=727d3d18732db0982e45bf31ecfd98a364a40a68fb2047b60bca55db6c1657fb&",
        alt: "Print da resposta da api",
        repo: "https://github.com/joashneves/ApiPersonagens",
        projeto: "https://personagensaleatorios.squareweb.app/api/Personagems",
      },
      {
        title: "Ominiun",
        subTitle: "Um pequeno jogo feito com game maker",
        content: "Meu jogo feito no game maker studio 2, sendo esse um jogo que a ideia é o personagem ser o mais frenetico possivel, com varias coisas acontecendo na tela, ele possui 3 levels, e 3 bosses varias armas com efeitos diferente, sendo um shooter.  ",
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
