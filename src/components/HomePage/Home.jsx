import useSWR from "swr";
import styles from "./Home.module.css";
import ComponentTextHome from "./ComponentTextHome/Index";
import templatePageHOC from "src/services/template/tamplatePageHOC";

// Função para buscar dados da API
async function fetchApi(key) {
  const response = await fetch(key);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const responseBody = await response.json();
  console.log("API Response:", responseBody);
  return responseBody;
}

// Componente para exibir os dados da API
function ShowAPISHome() {
  // Usando o hook SWR para buscar dados
  const { data, error, isLoading } = useSWR("/api/v1/home", fetchApi);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados: {error.message}</div>;

  const homeData = data["pt-br"];

  return (
    <>
      <h1>{homeData["titulo-home"]}</h1>
      <div className={styles.renderComponent}>
        {/* Iterando pelas seções e exibindo o conteúdo */}
        {Object.keys(homeData.descricao).map((key) => {
          const section = homeData.descricao[key];
          return (
            <ComponentTextHome
              key={key}
              title={section.title}
              content={section.content}
            />
          );
        })}

        {/* Adicionando a imagem entre as seções */}
        <div className={styles.imageContainer}>
          <a
            href="https://github.com/joashneves"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=joashneves&layout=donut&langs_count=7&theme=aura"
              alt="Top Languages"
            />
          </a>
        </div>

        <div className={styles.imageContainer}>
          <img
            loading="lazy"
            src="https://github-readme-stats.vercel.app/api?username=joashneves&show_icons=true&theme=aura&include_all_commits=true&count_private=true"
            alt="GitHub Stats"
          />
        </div>

        <br />
        <div className={styles.imageContainer}>
          <a href="https://github.com/joashneves/joashneves.me">
            <img
              align="center"
              src="https://github-readme-stats.vercel.app/api/pin/?username=joashneves&repo=joashneves.me"
            />
          </a>
        </div>
        <div className={styles.imageContainer}>
          <a href="https://github.com/joashneves/SkalartBot">
            <img
              align="center"
              src="https://github-readme-stats.vercel.app/api/pin/?username=joashneves&repo=SkalartBot"
            />
          </a>
        </div>
      </div>
    </>
  );
}

// Componente principal
function HomePage() {
  return <ShowAPISHome />;
}

export default templatePageHOC(HomePage, {
  title: "Home",
})
