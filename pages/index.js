import { Card } from "primereact/card";
import HomePage from "src/components/HomePage/Home";
import PostsService from "src/services/posts/PostsServices";
import { withTemplateConfig } from "src/services/template/withTamplateConfig";

export async function getStaticProps() {
  const posts = await PostsService().getAll();
  console.log("[Posts]", posts);
  return {
    props: await withTemplateConfig({
      posts,
    }),
  };
}

function Home() {
  return (
    <>
      <h1>Em construção...</h1>
      <HomePage />
      <Card title="Bem vindo e desculpe a bagunça!">
        <p>Esta e algumas das muitas paginas estão em construção, esse blog serve inicialmente para mostrar alguns de meus projetos e explicar seus funcionamentos, juntos com seu modo de uso, 
          caso esteja curioso sintasse livre para explorar o que, que tenha por ai, mas caso voce ache legal, e queria que eu termine logo, me avise, quem sabe eu me animo a terminar mais rápido.
        </p>
      </Card>
    </>
  );
}

export default Home;
