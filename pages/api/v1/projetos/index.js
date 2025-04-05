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
        content: "O objetivo do projeto no inicio foi criar um site fullstack em 7 dias, a ideia do projeto foi tentar criar um motor de busca, aonde as pessoa podem compartilhar seus links e outras pessoas podem votar para que aquele link possa aparecer primeiro que os outros nas pesquisas, fazendo assim que o usuario possa compartilhar seus links que nixo",
          image: "https://cdn.discordapp.com/attachments/1252065348191129641/1357904652774936858/image.png?ex=67f1e6c1&is=67f09541&hm=8ce0ceba68dba596df4b59fe080ac9aade3efd9a1add88c66b52647cfa91ba6d&",
          alt: "Print do site",
          repo: "https://github.com/joashneves/typegator",
          projeto: "https://typergator.squareweb.app/",
        },
        {
          title: "Skalart",
          subTitle: "Um bot do discord",
          content: "Um bot do discord",
          image: "https://cdn.discordapp.com/attachments/1252065348191129641/1357913471777247372/image.png?ex=67f1eef8&is=67f09d78&hm=cb41e4cec2d284a13470612ce648959cbef1eb7b4711e8b1d86c1710c5fc188b&",
          alt: "Print do bot",
          repo: "https://github.com/joashneves/SkalartBot",
          projeto: "https://github.com/joashneves/SkalartBot",
        },
      ]
    );
  } catch (error) {
    return response.status(500).json({
      error: "Erro: " + error.message,
    });
  }
}
