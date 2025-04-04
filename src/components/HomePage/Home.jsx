import useSWR from "swr";
import styles from "./Home.module.css";
import ComponentTextHome from "./ComponentTextHome/Index";
import templatePageHOC from "src/services/template/tamplatePageHOC";
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

        {Object.keys(homeData.descricao).map((key) => {
          const section = homeData.descricao[key];
          return (
            <Card className={styles.card}
              key={key}
              title={section.title}
            ><p>{section.content}</p>
            <Divider type="dotted"/>
            </Card>
          );
        })}
      
      <Card className={styles.card} title="Bem vindo e desculpe a bagunça!">
        <p className="m-0">
          Esta e algumas das muitas paginas estão em construção, esse blog serve
          inicialmente para mostrar alguns de meus projetos e explicar seus
          funcionamentos, juntos com seu modo de uso, caso esteja curioso
          sintasse livre para explorar o que, que tenha por ai, mas caso voce
          ache legal, e queria que eu termine logo, me avise, quem sabe eu me
          animo a terminar mais rápido.
        </p>
        <Divider align="left">
          <div className="inline-flex align-items-center">
            <i className="pi pi-user mr-2"></i>
            <b>Social</b>
          </div>
        </Divider>
        <p className="m-0">
          Esse é um blog para guardar as coisas que eu crio ou comentar as
          coisas que eu acho interressante compartilhar.
        </p>
        <Divider />
        <p className="m-0">Teste</p>
      </Card>
    </>
  );
}

// Componente principal
function HomePage() {
  return <ShowAPISHome />;
}

export default HomePage;
