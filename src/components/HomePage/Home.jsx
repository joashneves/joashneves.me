import useSWR from "swr";
import styles from "./Home.module.css";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

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
      {Object.keys(homeData.descricao).map((title) => {
        const section = homeData.descricao[title];
        return (
          <div key={title} className={styles.homePageDiv}>
            <Card className={styles.card}  title={section.title}>
              <p>{section.content}</p>
              <Divider type="dotted" />
            </Card>
          </div>
        );
      })}
    </>
  );
}

// Componente principal
function HomePage() {
  return <ShowAPISHome />;
}

export default HomePage;
