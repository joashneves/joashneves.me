import useSWR from "swr";

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
  const { data, error, isLoading } = useSWR("/api/v1/home", fetchApi, {
    refreshInterval: 2000,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados: {error.message}</div>;

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

// Componente principal
export default function HomePage() {
  return <ShowAPISHome />;
}
