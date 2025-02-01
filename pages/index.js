import HomePage from "src/components/HomePage/Home";
import { withTemplateConfig } from "src/services/template/withTamplateConfig";


export async function getStaticProps(params) {

  return{
    props: await withTemplateConfig({})
  }
}

function Home() { 
  return (
    <>
      <h1>Em construção...</h1>
      <HomePage />
    </>
  );
}

export default Home;
