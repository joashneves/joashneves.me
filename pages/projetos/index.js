import styles from "./projetos.module.css";
import useSWR from "swr";
import MainContentProjetos from "src/components/MainContentProjetos/Index";

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

function Projetos() {
  const { data, error, isLoading } = useSWR("/api/v1/projetos", fetchApi);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados: {error.message}</div>;

  console.log(data);
  const projetosData = data;

  return (
    <>
      <div className={styles.projetos}>
        {projetosData.map((proj, key) => {
          return (
            <MainContentProjetos
              key={key}
              title={proj.title}
              content={proj.content}
              />
          );
        })}
      </div>
    </>
  );
}

export default Projetos;
